-- ==============================================================================
-- MYSTORIA BLOG & ARTICLES DATABASE SCHEMA FOR SUPABASE
-- Run this in your Supabase project's SQL Editor (Dashboard > SQL Editor > New query)
-- ==============================================================================

-- 1. Create the articles table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT DEFAULT '',
    category TEXT NOT NULL DEFAULT 'Insights',
    tags TEXT[] DEFAULT '{}',
    author_name TEXT NOT NULL DEFAULT 'Mystoria Editorial',
    author_role TEXT DEFAULT 'Growth Strategist',
    author_avatar TEXT DEFAULT '',
    read_time TEXT DEFAULT '5 min read',
    is_featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON public.articles(is_featured);

-- 3. Automatic updated_at timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_articles_updated_at ON public.articles;
CREATE TRIGGER trigger_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 4. Secure RPC function to increment article view counts
CREATE OR REPLACE FUNCTION public.increment_article_views(article_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.articles
    SET views = COALESCE(views, 0) + 1
    WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Row Level Security (RLS) Configuration
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Drop previous policies if re-running
DROP POLICY IF EXISTS "Public can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Authenticated users full access" ON public.articles;
DROP POLICY IF EXISTS "Anon full access for simple admin" ON public.articles;

-- Policy A: Anyone can read published articles (Public visitor access)
CREATE POLICY "Public can view published articles"
    ON public.articles
    FOR SELECT
    USING (published = true);

-- Policy B: Authenticated users (logged into Supabase) have full CRUD control
CREATE POLICY "Authenticated users full access"
    ON public.articles
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy C: If you are using the hidden admin panel with passcode authentication
-- and connecting via the standard Anon key, enable full access for anon below:
CREATE POLICY "Anon full access for simple admin"
    ON public.articles
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 6. Initial Seed Articles (Populates your database with high quality articles)
-- ==============================================================================

INSERT INTO public.articles (
    title,
    slug,
    excerpt,
    content,
    cover_image,
    category,
    tags,
    author_name,
    author_role,
    author_avatar,
    read_time,
    is_featured,
    published,
    views
) VALUES 
(
    'The Death of Generic UGC: Why Cinematic Performance Ads 5x Creative ROAS',
    'death-of-generic-ugc-cinematic-performance-ads',
    'Consumer banner blindness has evolved. The amateur iPhone talking-head video is losing its efficiency. Here is how high-production cinematic storytelling combined with direct response engineering is capturing the modern luxury and direct-to-consumer landscape.',
    '## The Creative Fatigue Crisis

Over the last four years, the performance marketing industry got lazy. Media buyers embraced a singular gospel: *film amateur UGC on an iPhone, add yellow captions, trigger a hook in 1.2 seconds, and pump spend into Meta Advantage+*.

It worked—until every direct-to-consumer brand looked identical. Today, consumers scroll past cookie-cutter testimonial videos before the speaker can finish their opening sentence.

The data is undeniable: across our client portfolio analyzing over $12M in annual paid social spend, **standard UGC creative exhaustion now occurs within 9 to 14 days**, compared to 45+ days in 2021.

---

## The Shift to High-Fidelity Performance

Direct response does not have to look cheap. When a brand pairs cinematic aesthetic direction with ruthless conversion architecture, three things occur simultaneously:

1. **Brand Equity Compounding**: Instead of devaluing the product perception, your paid traffic actively establishes authority.
2. **Hook Rate Acceleration**: Premium lighting, unexpected camera movements, and deliberate sound design disrupt the doom-scroll faster than a selfie camera.
3. **Higher Average Order Value (AOV)**: Premium visuals subconsciously anchor premium price tolerances.

> "Aesthetics without conversion architecture is vanity; conversion architecture without aesthetics is brand erosion."

---

## The 4-Step Cinematic Framework We Deploy

### 1. The Pattern Disruptor (0.0s – 2.5s)
We eliminate the standard talking head. Instead, we open in media res—a macro lens tracking water beads on a cold aluminum chassis, or an intense sound design cue paired with a paradoxical visual statement.

### 2. Visceral Problem Amplification (2.5s – 8.0s)
Rather than telling the viewer about a frustration, make them physically feel it through high-speed cinematography and spatial audio.

### 3. The Proprietary Mechanism
Never sell the commodity. Sell the *unique engineering mechanism*. Explain why existing alternatives fail and how this specific formulation or system alters the outcome.

### 4. Zero-Friction Call-To-Action
Close with an unambiguous, clean invitation that mirrors the aesthetic of an editorial film rather than a high-pressure infomercial.',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80',
    'Creative Strategy',
    ARRAY['Meta Ads', 'Paid Media', 'Creative Direction', 'ROAS'],
    'Sujeet S.',
    'Creative Director',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    '6 min read',
    true,
    true,
    1842
),
(
    'Scaling Paid Media Beyond $500k/Month: The Liquidity Architecture',
    'scaling-paid-media-liquidity-architecture',
    'Most ad accounts stall out at $100k-$150k monthly spend due to budget fragmentation and audience collision. Learn the consolidated liquidity framework we use to scale accounts without performance collapse.',
    '## The Breakpoint of Media Buying

When brands scale from $50,000/month to $500,000/month in ad spend, the traditional tactics that got them to six figures inevitably fail.

The most common failure mode is **account fragmentation**:
- 25 separate campaigns targeting micro-lookalikes
- Bid caps fighting cost caps across conflicting ad sets
- Creative assets starved of algorithm liquidity

---

## Why Consolidated Liquidity Wins

Meta and TikTok algorithms require minimum conversion thresholds (typically 50 attributed events per week per ad set) to exit the learning phase and optimize delivery. 

When you fragment your budget across 30 ad sets, none of them receive enough data to stabilize. The algorithm operates in permanent guesswork.

### The 3-Tier Account Structure

1. **Broad Advantage+ Scaling Engine (75% of spend)**: Completely open demographic targeting with algorithmic creative routing.
2. **Creative Sandbox / Incubation (20% of spend)**: Systematic testing environment with dynamic creative testing (DCT) protocols to discover statistical winners.
3. **First-Party Retargeting / Retention (5% of spend)**: Tight exclusion pools targeting high-intent cart abandoners and lapsed subscribers.

---

## The Rule of Creative Velocity

At $500,000 monthly spend, creative fatigue is a mathematical certainty. You cannot survive on one hit creative. You need an assembly line producing **15 to 25 verified creative variations every week**, tested against rigid statistical signposts.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
    'Performance',
    ARRAY['Scaling', 'Media Buying', 'Meta Advantage+', 'Analytics'],
    'Alex Vance',
    'Head of Growth',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    '8 min read',
    false,
    true,
    1290
),
(
    'Programmatic SEO & AI Search Dominance in the Era of Perplexity & SGE',
    'programmatic-seo-ai-search-dominance',
    'Traditional keyword stuffing is dead. As Google AI Overviews and Perplexity reshape user discovery, here is how we engineer semantic knowledge graphs to capture high-intent organic buyer traffic.',
    '## The New Anatomy of Search

Search is no longer a list of ten blue links. It is a synthesis layer powered by Large Language Models parsing web corpus data to deliver immediate conversational answers.

If your content exists solely to capture long-tail keywords without providing proprietary data or verified domain expertise, you will be summarized away.

---

## How to Win in Generative Search Engines (GEO)

### 1. Becoming the Primary Citation Source
AI engines favor citations with primary data, proprietary experiments, and quantifiable benchmarks. When you publish original research, the AI cites you as the definitive authority.

### 2. Structured Knowledge Graph Integration
Implement rigorous JSON-LD Schema markup. If search crawlers can parse your entities, authors, citations, and product graphs without inference, your likelihood of inclusion in AI Overviews surges by over 300%.

### 3. Programmatic Hub-and-Spoke Topology
Build modular directory structures backed by relational databases that answer deep domain-specific queries with instant precision.',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80',
    'Search Dominance',
    ARRAY['SEO', 'AI Search', 'Perplexity', 'Organic Growth'],
    'Elena Rostov',
    'Search Strategist',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    '5 min read',
    false,
    true,
    940
),
(
    'The Retention Engine: How We Turned 18% Repeat Rates into 47% LTV Compounding',
    'retention-engine-repeat-rates-ltv-compounding',
    'Acquiring customers on paid social without a robust retention flywheel is burning cash. Explore the post-purchase psychology, SMS cadence, and subscription architecture we built for high-growth brands.',
    '## The Leaky Bucket Reality

Most ecommerce founders obsess over customer acquisition cost (CAC). But in 2026, media costs are structural. The only genuine competitive moat in modern direct-to-consumer commerce is **Day-90 Customer Lifetime Value (LTV)**.

If your CAC is $65 and your Average Order Value (AOV) is $80, you have razor-thin margins. But if 45% of those customers purchase a replenishment SKU within 60 days at $0 additional acquisition cost, your profitability is exponential.

---

## The 4 Pillars of Retention Engineering

### 1. The Unboxing Dopamine Window (Days 0–3)
Do not blast promotional discount emails while the customer is waiting for their order. Send immersive educational content on how to extract maximum value from the purchase.

### 2. Predictive Replenishment Cadence
Analyze consumption cycle curves. If a consumable bottle lasts 28 days on average, triggering a reorder prompt on day 35 is too late—they have already broken the habit. Trigger predictive reminders on day 22.

### 3. VIP Community Gating
Reward high-frequency buyers with exclusive access to product drops and private consultation channels. Belonging drives loyalty far more effectively than 10% coupon codes.',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80',
    'Growth Engineering',
    ARRAY['LTV', 'Retention', 'Email & SMS', 'Customer Loyalty'],
    'Sujeet S.',
    'Growth Partner',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    '7 min read',
    false,
    true,
    1510
)
ON CONFLICT (slug) DO NOTHING;
