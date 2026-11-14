import type { Metadata } from "next";
import { CommitteeUnderConstruction } from "@/components/core-committee/committee-under-construction";

export const metadata: Metadata = {
  title: "Core Committee | KERNEL '26",
  description:
    "The organizing core committee behind KERNEL 1.0, Department of Information Technology, Jadavpur University.",
};

export default function CoreCommitteePage() {
  return (
    <main id="committee-main">
      <CommitteeUnderConstruction />
    </main>
  );
}
