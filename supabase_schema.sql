-- 1. Create Organizations Table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  license_number TEXT UNIQUE,
  credibility_score INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Profiles Table (linked to Auth.Users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'publisher')) DEFAULT 'publisher',
  org_id UUID REFERENCES organizations(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Articles Table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id) NOT NULL,
  headline TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT,
  source_urls TEXT[] DEFAULT '{}',
  status TEXT CHECK (status IN ('under_review', 'published', 'flagged')) DEFAULT 'under_review',
  credibility_score INTEGER DEFAULT 100,
  flag_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- 4. Create Warnings Table
CREATE TABLE warnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id) NOT NULL,
  reason TEXT NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Row Level Security (RLS)

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE warnings ENABLE ROW LEVEL SECURITY;

-- Policies for Organizations
CREATE POLICY "Public can view orgs" ON organizations FOR SELECT USING (true);
CREATE POLICY "Admins can update orgs" ON organizations FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Policies for Articles
CREATE POLICY "Public can view published articles" ON articles FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Publishers can view their own articles" ON articles FOR SELECT
  USING (org_id IN (SELECT org_id FROM profiles WHERE profiles.id = auth.uid()));

CREATE POLICY "Publishers can insert articles" ON articles FOR INSERT 
  WITH CHECK (org_id IN (SELECT org_id FROM profiles WHERE profiles.id = auth.uid()));

-- IMMUTABILITY RULE: Deny updates once published (except for status changes by admin)
CREATE POLICY "Immutability: Deny updates to published articles" ON articles FOR UPDATE
  USING (
    (status != 'published') OR 
    (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  );

-- Admin Global Access
CREATE POLICY "Admins have full access" ON articles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
