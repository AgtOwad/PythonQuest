"""FastAPI application powering the PythonQuest production experience."""

from __future__ import annotations

import hashlib
import secrets
from datetime import datetime
from typing import Dict, List

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, EmailStr

app = FastAPI(
    title="PythonQuest API",
    version="1.0.0",
    description="Service powering PythonQuest learner onboarding, authentication, and lesson progress tracking.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer(auto_error=False)


class Lesson(BaseModel):
    id: str
    title: str
    description: str
    estimated_minutes: int


class ProgressUpdate(BaseModel):
    user_id: str
    lesson_id: str
    status: str
    xp_earned: int
    gems_earned: int


class ProgressEntry(ProgressUpdate):
    recorded_at: str


class UserProfile(BaseModel):
    id: str
    name: str
    email: EmailStr
    level: int
    xp: int
    streak: int
    gems: int
    avatarUrl: str


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class SessionResponse(BaseModel):
    token: str
    user: UserProfile


class PasswordResetRequest(BaseModel):
    email: EmailStr


class OnboardingPreferences(BaseModel):
    experience: str
    goal: str
    cadence: str


LESSONS: List[Lesson] = [
    Lesson(
        id="control-flow",
        title="Introduction to Control Flow",
        description="Master conditional logic and branching.",
        estimated_minutes=25,
    ),
    Lesson(
        id="functions",
        title="Functions Fundamentals",
        description="Learn how to define and reuse logic.",
        estimated_minutes=30,
    ),
    Lesson(
        id="data-structures",
        title="Working with Data Structures",
        description="Practice manipulating lists, tuples, and dictionaries in real scenarios.",
        estimated_minutes=35,
    ),
]

USERS: Dict[str, Dict[str, object]] = {}
SESSIONS: Dict[str, str] = {}
ONBOARDING_RESPONSES: List[dict] = []
PROGRESS_LOG: Dict[str, List[dict]] = {}


def _hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.sha256(f"{salt}:{password}".encode("utf-8")).hexdigest()
    return f"{salt}${digest}"


def _verify_password(password: str, hashed: str) -> bool:
    try:
        salt, digest = hashed.split("$", maxsplit=1)
    except ValueError:  # pragma: no cover - defensive
        return False
    calculated = hashlib.sha256(f"{salt}:{password}".encode("utf-8")).hexdigest()
    return secrets.compare_digest(calculated, digest)


def _create_token() -> str:
    return secrets.token_urlsafe(32)


def _serialize_user(record: Dict[str, object]) -> UserProfile:
    return UserProfile(
        id=record["id"],
        name=record["name"],
        email=record["email"],
        level=record["level"],
        xp=record["xp"],
        streak=record["streak"],
        gems=record["gems"],
        avatarUrl=record["avatarUrl"],
    )


def _require_session(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, object]:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing credentials")

    token = credentials.credentials
    email = SESSIONS.get(token)
    if email is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session token")

    user_record = USERS.get(email)
    if user_record is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Account no longer exists")

    return user_record


def _seed_default_user() -> None:
    """Create a demo account for development builds."""

    default_email = "alex@example.com"
    if default_email in USERS:
        return

    USERS[default_email] = {
        "id": "user-1",
        "name": "Alex Doe",
        "email": default_email,
        "level": 5,
        "xp": 450,
        "streak": 15,
        "gems": 1250,
        "avatarUrl": "https://picsum.photos/id/237/100/100",
        "password": _hash_password("learnpython"),
    }


_seed_default_user()


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}


@app.post("/onboarding/preferences")
def capture_preferences(preferences: OnboardingPreferences) -> dict:
    payload = preferences.model_dump()
    payload["submitted_at"] = datetime.utcnow().isoformat()
    ONBOARDING_RESPONSES.append(payload)
    return {"stored": True}


@app.post("/auth/signup", response_model=SessionResponse)
def signup(request: SignupRequest) -> SessionResponse:
    email_key = request.email.lower()
    if email_key in USERS:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Account already exists")

    user_id = f"user-{len(USERS) + 1}"
    profile = {
        "id": user_id,
        "name": request.name,
        "email": email_key,
        "level": 1,
        "xp": 0,
        "streak": 0,
        "gems": 500,
        "avatarUrl": f"https://api.dicebear.com/7.x/initials/svg?seed={request.name}",
        "password": _hash_password(request.password),
    }
    USERS[email_key] = profile

    token = _create_token()
    SESSIONS[token] = email_key

    return SessionResponse(token=token, user=_serialize_user(profile))


@app.post("/auth/login", response_model=SessionResponse)
def login(request: LoginRequest) -> SessionResponse:
    email_key = request.email.lower()
    user_record = USERS.get(email_key)
    if user_record is None or not _verify_password(request.password, user_record["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = _create_token()
    SESSIONS[token] = email_key

    return SessionResponse(token=token, user=_serialize_user(user_record))


@app.get("/auth/session", response_model=SessionResponse)
def session(user: Dict[str, object] = Depends(_require_session), credentials: HTTPAuthorizationCredentials = Depends(security)) -> SessionResponse:
    return SessionResponse(token=credentials.credentials, user=_serialize_user(user))


@app.post("/auth/reset")
def request_password_reset(payload: PasswordResetRequest) -> dict:
    exists = payload.email.lower() in USERS
    return {"sent": True, "existingAccount": exists}


@app.get("/lessons", response_model=List[Lesson])
def list_lessons(_: Dict[str, object] = Depends(_require_session)) -> List[Lesson]:
    return LESSONS


@app.get("/lessons/{lesson_id}", response_model=Lesson)
def get_lesson(lesson_id: str, _: Dict[str, object] = Depends(_require_session)) -> Lesson:
    for lesson in LESSONS:
        if lesson.id == lesson_id:
            return lesson
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lesson not found")


@app.post("/progress", response_model=ProgressEntry)
def record_progress(update: ProgressUpdate, user: Dict[str, object] = Depends(_require_session)) -> ProgressEntry:
    entry = update.model_dump()
    entry["recorded_at"] = datetime.utcnow().isoformat()
    PROGRESS_LOG.setdefault(user["id"], []).append(entry)
    return ProgressEntry(**entry)


@app.get("/progress", response_model=List[ProgressEntry])
def list_progress(user: Dict[str, object] = Depends(_require_session)) -> List[ProgressEntry]:
    entries = PROGRESS_LOG.get(user["id"], [])
    return [ProgressEntry(**entry) for entry in entries]
