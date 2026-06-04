import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CareerRoleDetail from "@/components/careers/CareerRoleDetail";
import { careerRoles, getCareerRoleBySlug } from "@/data/careers";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return careerRoles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareerRoleBySlug(slug);
  if (!role) return { title: "Careers" };
  return {
    title: `${role.title} — Careers`,
    description: role.summary,
  };
}

export default async function CareerRolePage({ params }: Props) {
  const { slug } = await params;
  const role = getCareerRoleBySlug(slug);
  if (!role) notFound();

  return <CareerRoleDetail role={role} />;
}
