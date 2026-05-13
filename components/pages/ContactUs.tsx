"use client";

import { Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: 'idle', message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.',
        });
        setSubmitting(false);
        return;
      }
      setStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not reach the server. Check your connection and try again.',
      });
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Contact Us"
        description="Get in touch with ToolzBanana - We'd love to hear from you"
      />

      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or suggestion? We read every message. Please include enough
            detail—URLs, screenshots of errors (with secrets removed), and what browser
            you use—so we can reproduce the issue quickly.
          </p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mt-4">
            For privacy-related requests, mention whether you are asking about
            advertising cookies, data retention, or a specific tool workflow. That helps
            route your note to the correct checklist without extra back-and-forth.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Mail className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">support@toolzbanana.com</p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Response Time
                  </h3>
                  <p className="text-gray-600">Usually within 24 hours</p>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            {status.type === 'success' && (
              <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                {status.message}
              </p>
            )}
            {status.type === 'error' && (
              <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {status.message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={6}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900 placeholder-gray-500 disabled:opacity-60"
                />
              </div>

              <Button type="submit" variant="primary" size="md" disabled={submitting}>
                <Send className="w-5 h-5" />
                {submitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
