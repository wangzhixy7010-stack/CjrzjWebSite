export interface CqcpeNavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface CqcpeHall {
  id: string;
  name: string;
  href: string;
  image: string;
  description: string;
}

export interface CqcpeNewsItem {
  title: string;
  date: string;
  href: string;
  image?: string;
  excerpt?: string;
}

export interface CqcpeMagazineIssue {
  title: string;
  href: string;
  image: string;
  sponsor: string;
  language: string;
  date: string;
}

export interface CqcpeFriendLink {
  label: string;
}
