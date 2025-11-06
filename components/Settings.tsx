
import React, { useState } from 'react';

const Toggle: React.FC<{ label: string; description: string; initialValue?: boolean }> = ({ label, description, initialValue = false }) => {
    const [isOn, setIsOn] = useState(initialValue);
    return (
        <div className="flex items-center justify-between py-4">
            <div>
                <p className="font-semibold text-text-primary">{label}</p>
                <p className="text-sm text-text-secondary">{description}</p>
            </div>
            <button onClick={() => setIsOn(!isOn)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isOn ? 'bg-primary' : 'bg-slate-600'}`}>
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
};

const Settings: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-8">Settings</h1>

            <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 border-b border-border-color pb-2">Appearance</h2>
                <div className="bg-surface rounded-lg p-6">
                    <Toggle label="Dark Mode" description="Switch between light and dark themes" initialValue={true} />
                    <hr className="border-border-color"/>
                    <Toggle label="Sync with system" description="Automatically match your system's theme" initialValue={true} />
                </div>
            </section>
            
            <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4 border-b border-border-color pb-2">Account & Privacy</h2>
                <div className="bg-surface rounded-lg p-6">
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <p className="font-semibold text-text-primary">Privacy Policy</p>
                            <p className="text-sm text-text-secondary">Read our terms and privacy policy</p>
                        </div>
                        <button className="text-primary font-semibold hover:underline">View Policy</button>
                    </div>
                     <hr className="border-border-color"/>
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <p className="font-semibold text-text-primary">Download your data</p>
                            <p className="text-sm text-text-secondary">Get a copy of your personal data</p>
                        </div>
                        <button className="text-primary font-semibold hover:underline">Request Download</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Settings;
