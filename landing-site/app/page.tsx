export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#1a1a1a] font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#f8f6f2]/90 backdrop-blur border-b border-[#e2d8cc]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-[#2a2a2a]">Fincept Terminal</h1>
          <div className="hidden md:flex gap-8 text-sm text-[#555]">
            <a href="#product" className="hover:text-[#bfa163] transition-colors">Product</a>
            <a href="#about" className="hover:text-[#bfa163] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#bfa163] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-40 md:pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-semibold tracking-widest uppercase text-[#bfa163] mb-4">Unified Investment Explorer</p>
          <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-[#2a2a2a] mb-6">
            Operationalize Your Financial Intelligence.
          </h2>
          <p className="text-lg text-[#555] leading-relaxed mb-8 max-w-lg">
            A next-gen terminal that connects everything — global markets, curated datasets, and AI.
            Built for professionals who need data-driven decision-making without the noise.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3.5 bg-[#2a2a2a] text-[#f8f6f2] text-sm font-semibold rounded hover:bg-[#444] transition-colors">
              Explore
            </button>
            <button className="px-8 py-3.5 border border-[#2a2a2a] text-[#2a2a2a] text-sm font-semibold rounded hover:bg-[#2a2a2a] hover:text-[#f8f6f2] transition-colors">
              Documentation
            </button>
          </div>
        </div>
        <div className="w-full h-64 md:h-96 rounded-2xl bg-[#e8e4de] border border-[#d6cec4] flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-[#2a2a2a] flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-[#bfa163]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <p className="text-[#555] text-sm">Dashboard Preview</p>
          </div>
        </div>
      </header>

      {/* Trusted By */}
      <section className="py-12 border-y border-[#e2d8cc]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#999] mb-4">Trusted By</p>
          <p className="text-xl font-medium text-[#555]">The most innovative investors, startups and institutions.</p>
        </div>
      </section>

      {/* Features */}
      <section id="product" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#e2d8cc] rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#bfa163]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2a2a2a]">Financial Analysis Engine</h3>
              <p className="text-[#555] leading-relaxed">Quick, basic, and power analysis of Financial Statement, Ratio Analysis, Technical Analysis, Market Risk etc.</p>
              <a href="#" className="inline-block mt-4 text-sm font-semibold text-[#bfa163] hover:underline">Learn more &rarr;</a>
            </div>
            <div className="bg-white border border-[#e2d8cc] rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#bfa163]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.015-7.01.063-1.585.233-2.708 1.626-2.708 3.228v6.741z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2a2a2a]">AI Chat</h3>
              <p className="text-[#555] leading-relaxed">Talk to Fincept, your trusted financial advisor. Powered by Generative AI, it leverages our proprietary database to research fast.</p>
              <a href="#" className="inline-block mt-4 text-sm font-semibold text-[#bfa163] hover:underline">Learn more &rarr;</a>
            </div>
            <div className="bg-white border border-[#e2d8cc] rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#bfa163]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#2a2a2a]">Powerful Search</h3>
              <p className="text-[#555] leading-relaxed">Retrieve data from our proprietary database, which includes over 200,000+ Global Stocks, 10,000+ Mutual Funds, 8000+ ETF etc.</p>
              <a href="#" className="inline-block mt-4 text-sm font-semibold text-[#bfa163] hover:underline">Learn more &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-section */}
      <section className="py-24 bg-white border-y border-[#e2d8cc]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 w-full h-80 rounded-2xl bg-[#e8e4de] border border-[#d6cec4] flex items-center justify-center">
            <p className="text-[#888] text-sm font-medium">Generative AI Agent</p>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#bfa163] mb-4">AI</p>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight text-[#2a2a2a] mb-4">Generative AI Agent</h3>
            <p className="text-lg text-[#555] leading-relaxed">
              Tasks like research, data retrieval, analysis, coding, and execution can be done automatically with simple prompts or through cron jobs.
            </p>
          </div>
        </div>
      </section>

      {/* More Features */}
      <section className="py-24 bg-[#f8f6f2]">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-[#2a2a2a] mb-12">A Complete Financial Toolkit</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Global Markets",
              " Indices",
              "News",
              "Commodities",
              "Crypto",
              "Currency",
              "Financial Analysis",
              "Equity",
              "Macro Research",
              "AI Chat",
              "Business Info",
              "Screener",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white border border-[#e2d8cc] rounded-xl px-5 py-4">
                <span className="w-2 h-2 rounded-full bg-[#bfa163]"></span>
                <span className="text-sm font-semibold text-[#555]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white border-y border-[#e2d8cc]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-[#2a2a2a] mb-6">Our Story</h3>
          <p className="text-lg text-[#555] leading-relaxed mb-6">
            Fincept Terminal was born out of a simple idea: financial professionals deserve a tool that connects global markets, curated datasets, and AI-powered analytics in one place. Born in New Delhi, India, we started building Fincept Corporation in 2024.
          </p>
          <p className="text-lg text-[#555] leading-relaxed">
            Named after two core platforms — financial information and acceptance — Fincept's mission is to democratize access to advanced financial tools.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-[#2a2a2a] mb-12">What People Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "David Thompson", role: "Professional Investor", text: "Fincept Terminal has transformed how I analyze the markets. Comprehensive data and seamless experience." },
              { name: "Emily Wang", role: "Financial Analyst", text: "The AI-powered analysis is a game changer. Saves hours every week and delivers results in seconds." },
              { name: "Michael Lee", role: "Portfolio Manager", text: "The most reliable tool in my trading toolkit. Data accuracy and speed are unmatched in the market." },
            ].map((t) => (
              <div key={t.name} className="bg-white border border-[#e2d8cc] rounded-2xl p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-[#bfa163]">★</span>)}
                </div>
                <p className="text-[#555] leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#f8f6f2] text-xs font-bold">{t.name.split(' ').map(n=>n[0]).join('')}</div>
                  <div>
                    <p className="text-sm font-bold text-[#2a2a2a]">{t.name}</p>
                    <p className="text-xs text-[#888]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-white border-t border-[#e2d8cc]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-3xl font-bold text-[#2a2a2a] mb-6">Get In Touch</h3>
            <p className="text-lg text-[#555] leading-relaxed mb-8">
              Have a question? Reach out to us and we'll get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              {[
                { label: "Info", value: "info@fincept.in" },
                { label: "Corporations", value: "corp@fincept.in" },
                { label: "Support", value: "support@fincept.in" },
                { label: "Phone 1", value: "+91 8360340367" },
                { label: "Phone 2", value: "+91 9417027607" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#bfa163] w-24 shrink-0">{item.label}</span>
                  <span className="text-sm text-[#555]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f8f6f2] border border-[#e2d8cc] rounded-2xl p-8">
            <h4 className="text-xl font-bold text-[#2a2a2a] mb-6">Visit Us</h4>
            <div className="space-y-4 text-sm text-[#555]">
              <p>~118, Lane-3</p>
              <p>Sheikh Sarai-2</p>
              <p>New Delhi</p>
              <p>Delhi, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#2a2a2a] text-[#d6cec4]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; 2024 Fincept Corporation. All rights reserved.</p>
          <p className="text-xs text-[#999]">Protocol: Financial Information + Acceptance</p>
        </div>
      </footer>
    </div>
  );
}
