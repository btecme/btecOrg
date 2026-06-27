export default function Services() {
    const services = [
        {
            title: 'Cloud & IT Solutions',
            description: 'Comprehensive cloud architecture, email migration, domain management, and robust backup strategies.',
            outcome: 'Scalable, secure infrastructure that grows with you.',
        },
        {
            title: 'Hardware Support',
            description: 'Expert repair, installation, and upgrades for laptops, workstations, servers, and peripherals.',
            outcome: 'Extended hardware lifecycle and minimized downtime.',
        },
        {
            title: 'Security Consulting',
            description: 'Network safety assessments, privacy audits, and implementation of best-practice security protocols.',
            outcome: 'Peace of mind and protection for critical assets.',
        },
        {
            title: 'General Tech Consulting',
            description: 'Vendor management, Virtual CIO services, and strategic technology planning.',
            outcome: 'Clear technology roadmap aligned with business goals.',
        },
        {
            title: 'Managed Endpoint Services',
            description: 'Tiered remote support, automated software updates, and proactive system monitoring.',
            outcome: 'Issues resolved before they disrupt operations.',
        },
        {
            title: 'Executive IT Stabilization & Modernization',
            description: 'For organizations that have outgrown informal IT, b-tec helps stabilize, modernize, and secure technology environments across cloud productivity, identity, endpoints, vendors, backups, automation, and distributed operations. Practical coverage includes Microsoft 365, Google Workspace, identity and endpoint management, vendor accountability, backup and disaster recovery, and AI readiness for leadership teams and multi-site operations.',
            outcome: 'Senior technology guidance without noise, hype, or unnecessary complexity.',
        },
        {
            title: 'AI Modernization / Alignment',
            description: 'Professional Alignment Services. Moving from unstructured data to AI-ready systems.',
            outcome: 'Operational readiness for the age of artificial intelligence.',
            highlight: true,
        },
        {
            title: 'Design & Construction',
            description: 'Architectural planning, material selection, and construction management for residential and light commercial projects. btec coordinates every phase - from design documentation and permitting through trade scheduling, quality control, and project closeout. We bring the same systematic, analytical approach to physical structures that we bring to digital infrastructure.',
            outcome: 'From blueprint to built - managed with precision.',
        },
        {
            title: 'Owner & Claims Advocacy',
            description: 'Owner representation, insurance claim support, and drone-assisted site assessment. We act as the owner\'s advocate through scope review, gap analysis, supplement preparation, and depreciation recovery for property damage claims. Our drone services provide detailed aerial documentation of rooflines, chimneys, gutters, and hard-to-access areas - giving owners and adjusters data they can\'t get from the ground.',
            outcome: 'Your advocate from damage assessment to final recovery.',
            cyan: true,
        },
    ];

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Services</h1>
            <p className="text-xl text-foreground/60 max-w-2xl mb-16">
                Practical, high-value technology services for organizations that demand reliability and foresight.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service) => (
                    <div
                        key={service.title}
                        className={`p-8 rounded-2xl border transition-all hover:-translate-y-1 ${service.cyan
                                ? 'bg-cyan-400/5 border-cyan-300/20 hover:border-cyan-300/40 shadow-[0_0_30px_rgba(34,211,238,0.08)]'
                                : service.highlight
                                    ? 'bg-accent/5 border-accent/20 hover:border-accent/40'
                                    : 'bg-white/5 border-white/5 hover:border-white/10'
                            }`}
                    >
                        <h3 className={`text-xl font-bold mb-4 ${service.cyan ? 'text-cyan-300' : service.highlight ? 'text-accent' : 'text-foreground'}`}>
                            {service.title}
                        </h3>
                        <p className="text-foreground/60 mb-6 leading-relaxed">
                            {service.description}
                        </p>
                        <div className={`text-sm font-medium border-t pt-4 ${service.cyan ? 'text-cyan-200/80 border-cyan-300/10' : 'text-foreground/40 border-white/5'}`}>
                            {service.outcome}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
