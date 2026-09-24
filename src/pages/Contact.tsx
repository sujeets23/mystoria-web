import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle, ShieldCheck } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Website',
    budget: '₹1L – ₹3L',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    'Branding',
    'Website',
    'UI/UX',
    'Motion',
    'Creative Campaign',
    'Other',
  ];

  const budgetTiers = [
    '₹25K – ₹50K',
    '₹50K – ₹1L',
    '₹1L – ₹3L',
    '₹3L+',
    "Let's discuss",
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Please tell us about your project';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate secure transmission without exposing API keys
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <main className="relative pt-32 md:pt-44 pb-28 md:pb-40">
      {/* Background Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-24 right-1/3 w-[650px] h-[650px] bg-crimson/10 blur-[150px] pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="border-b border-white/[0.08] pb-16 mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
              COMMISSIONS &amp; PARTNERSHIPS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.8rem] font-display font-extrabold uppercase tracking-tight text-white max-w-5xl leading-[1.02]">
            LET'S CREATE SOMETHING{' '}
            <span className="text-crimson">WORTH REMEMBERING.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base sm:text-xl text-neutral-400 font-light leading-relaxed">
            We are currently accepting selective brand and digital projects for 2026. Fill out the project brief below and our directors will respond within 24 hours.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <span className="text-xs font-mono text-crimson uppercase tracking-widest block mb-3">
                // DIRECT COMMUNICATIONS
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-white mb-4">
                PREFER TO EMAIL DIRECTLY?
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-4">
                For RFP submissions, press inquiries, or direct founder conversations:
              </p>
              <a
                href="mailto:hello@mystoria.agency"
                className="text-base sm:text-lg font-mono text-white hover:text-crimson transition-colors block"
              >
                hello@mystoria.agency
              </a>
            </div>

            <div className="pt-8 border-t border-white/[0.08] space-y-6">
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                  NEW YORK STUDIO
                </span>
                <span className="text-sm text-neutral-300">540 W 26th St, Chelsea, NY 10001</span>
              </div>

              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                  TOKYO STUDIO
                </span>
                <span className="text-sm text-neutral-300">Minami-Aoyama, Minato-ku, Tokyo 107-0062</span>
              </div>

              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                  RESPONSE TIME
                </span>
                <span className="text-sm text-neutral-300">Under 24 hours, Monday – Friday</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/[0.08] flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-crimson mt-1 shrink-0" />
              <div className="text-xs text-neutral-400 leading-relaxed">
                All inquiries are treated under mutual non-disclosure. We respect intellectual property and proprietary business visions.
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#0A0A0A] border border-white/[0.08]">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-crimson/20 border border-crimson flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-crimson" />
                  </div>
                  <h3 className="text-3xl font-display font-bold uppercase text-white mb-2">
                    INQUIRY TRANSMITTED
                  </h3>
                  <p className="max-w-md text-base text-neutral-300 font-light leading-relaxed mb-8">
                    Thank you, {formData.name}. Your project brief has been received. Our leadership team will review your specifications and contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        projectType: 'Website',
                        budget: '₹1L – ₹3L',
                        message: '',
                      });
                    }}
                    className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Elena Rostova"
                        className={`w-full bg-[#121212] border rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                          errors.name ? 'border-crimson focus:border-crimson' : 'border-white/10 focus:border-crimson'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] font-mono text-crimson mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@kronos.ch"
                        className={`w-full bg-[#121212] border rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                          errors.email ? 'border-crimson focus:border-crimson' : 'border-white/10 focus:border-crimson'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] font-mono text-crimson mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                      ORGANIZATION / COMPANY
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Kronos Haute Horlogerie"
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-crimson transition-colors"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-3">
                      PROJECT DISCIPLINE
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {projectTypes.map((type) => {
                        const isSelected = formData.projectType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setFormData({ ...formData, projectType: type })}
                            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                              isSelected
                                ? 'bg-crimson text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                                : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.06] hover:border-white/20'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Options */}
                  <div>
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-3">
                      ESTIMATED BUDGET
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {budgetTiers.map((tier) => {
                        const isSelected = formData.budget === tier;
                        return (
                          <button
                            type="button"
                            key={tier}
                            onClick={() => setFormData({ ...formData, budget: tier })}
                            className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                              isSelected
                                ? 'bg-white text-black font-bold'
                                : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.06] hover:border-white/20'
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                      PROJECT SCOPE &amp; OBJECTIVES *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your objectives, target timeline, and what makes this commission unique..."
                      className={`w-full bg-[#121212] border rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                        errors.message ? 'border-crimson focus:border-crimson' : 'border-white/10 focus:border-crimson'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] font-mono text-crimson mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      data-cursor="cta"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-crimson hover:bg-crimson-bright text-white font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.4)] disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND INQUIRY'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
