// app/profile/page.jsx

import ProfileHero from "./components/ProfileHero"
import ProfileStats from "./components/ProfileStats"
import ProfileSkills from "./components/ProfileSkills"
import ProfileProjects from "./components/ProfileProjects"
import ProfileTimeline from "./components/ProfileTimeline"
import ProfileTestimonials from "./components/ProfileTestimonials"
import ProfileContact from "./components/ProfileContact"

export const metadata = {
    title: "Profile | ᴅʀᴇᴀᴍ ᴛᴏ ꜰʟʏ",
    description:
        "Full-stack developer & UI/UX designer crafting beautiful digital experiences. Explore my skills, projects, and journey.",
}

export default function ProfilePage() {
    return (
        <main className="profile-main">
            <ProfileHero />
            <ProfileStats />
            <ProfileSkills />
            <ProfileProjects />
            <ProfileTimeline />
            <ProfileTestimonials />
            <ProfileContact />
        </main>
    )
}
