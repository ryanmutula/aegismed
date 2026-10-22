import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: October 22, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Explicit Consent and Agreement</h2>
        <p className="font-bold text-blue-600 dark:text-blue-400">
          By deciding to create an account and log in to AegisMed, you explicitly consent to the collection, processing, and use of your personal data as outlined in this Privacy Policy. This agreement and consent remain entirely in effect for as long as you maintain an account or utilize the application.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p>We collect the following types of information to provide and improve our educational services:</p>
        <ul className="list-disc pl-6 mt-2">
          <li><strong>Account Information:</strong> Name, email address, and authentication data provided during registration.</li>
          <li><strong>Usage Data:</strong> Interaction metrics, study unit progress, and frequency of use.</li>
          <li><strong>AI Tutor Interactions:</strong> Questions, prompts, and study materials submitted to the AI tutor to provide accurate contextual responses and improve the tutoring model.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p>Your information is used solely to enhance your learning experience on AegisMed. Specifically, we use it to:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Create and manage your user account.</li>
          <li>Provide personalized AI tutoring responses and track study progress.</li>
          <li>Maintain the security and integrity of the application.</li>
          <li>Analyze platform usage to improve our technical infrastructure and educational content.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Security</h2>
        <p>
          We do not sell, trade, or rent your personal identification information to third parties. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners for the purposes outlined above. We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Your Data Rights</h2>
        <p>
          Depending on your location, you have the right to request access to the data we hold about you, request corrections to your data, or request the deletion of your account and associated personal data. You can initiate these requests by contacting the administration through your dashboard.
        </p>
      </section>
    </div>
  );
}