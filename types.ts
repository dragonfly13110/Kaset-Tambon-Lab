import type { FC, SVGProps } from 'react';

export type Category = "all" | "tool" | "knowledge" | "dashboard";

export interface NavItem {
  href?: string;
  page?: string;
  label: string;
}

export interface Project {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  tag?: string;
  category: Exclude<Category, "all">;
}

export interface Contact {
    label: string;
    value: string;
    href: string;
    icon: FC<SVGProps<SVGSVGElement>>;
}

export type SkillLevel = "สอนเพื่อนได้" | "พอตัว" | "พอใช้" | "พอเอาตัวรอด";

export interface Skill {
  icon: FC<SVGProps<SVGSVGElement>>;
  name: string;
  level: SkillLevel;
  details: string;
}