'use client';

import { useState } from 'react';

export default function Contact() {
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpwvjvvv";

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        sector: 'Technology',
        fix: '',
        tolerance: 'Medium',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // We fetch directly to Formspree now
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' // Crucial: Tells Formspree to return JSON, not redirect
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', company: '', sector: 'Technology', fix: '', tolerance: 'Medium' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="container mx-auto px-6 py-20">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact</h1>
                <p className="text-xl text-foreground/60 mb-12">
                    Serious inquiries only. Tell us what you&apos;re trying to build or fix.
                </p>

                {status === 'success' ? (
                    <div className="p-8 rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
                        <h3 className="text-2xl font-bold text-green-500 mb-4">Message Received</h3>
                        <p className="text-foreground/80">
                            Thank you for reaching out. We will review your inquiry and get back to you shortly.
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-bold transition-colors"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground/80">Name</label>
                                <input
                                    type="text"
                                    name="name" // Added name attributes for safety
                                    required
                                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-accent focus:outline-none transition-colors"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground/80">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-accent focus:outline-none transition-colors"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground/80">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-accent focus:outline-none transition-colors"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground/80">Sector</label>
                                <select
                                    name="sector"
                                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-accent focus:outline-none transition-colors appearance-none"
                                    value={formData.sector}
                                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                                >
                                    <option value="AECO">AECO</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/80">What are you trying to fix in the next 12 months?</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-accent focus:outline-none transition-colors"
                                value={formData.fix}
                                onChange={(e) => setFormData({ ...formData, fix: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/80">Tolerance for operational disruption</label>
                            <select
                                name="tolerance"
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-accent focus:outline-none transition-colors appearance-none"
                                value={formData.tolerance}
                                onChange={(e) => setFormData({ ...formData, tolerance: e.target.value })}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full py-4 bg-accent text-background font-bold rounded-xl hover:bg-accent-dim transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                        </button>

                        {status === 'error' && (
                            <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}