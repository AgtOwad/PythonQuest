from datetime import datetime
from typing import List

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(
    title="PythonQuest API",
    version="0.1.0",
    description="Service powering PythonQuest learner data and lesson progress tracking.",
)


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
]

PROGRESS_LOG: List[dict] = []


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}


@app.get("/lessons", response_model=List[Lesson])
def list_lessons() -> List[Lesson]:
    return LESSONS


@app.get("/lessons/{lesson_id}", response_model=Lesson)
def get_lesson(lesson_id: str) -> Lesson:
    for lesson in LESSONS:
        if lesson.id == lesson_id:
            return lesson
    raise HTTPException(status_code=404, detail="Lesson not found")


@app.post("/progress")
def record_progress(update: ProgressUpdate) -> dict:
    entry = update.model_dump()
    entry["recorded_at"] = datetime.utcnow().isoformat()
    PROGRESS_LOG.append(entry)
    return {"saved": True, "entry": entry}
