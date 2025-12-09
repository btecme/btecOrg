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
            title: 'AI Modernization / Alignment',
            description: 'Professional Alignment Services. Moving from unstructured data to AI-ready systems.',
            outcome: 'Operational readiness for the age of artificial intelligence.',
            highlight: true,
        },
    ];

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Services</h1>
            <p className="text-xl text-foreground/60 max-w-2xl mb-16">
                Practical, high-value technology services for organizations that demand reliability and foresight.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <div
                        key={service.title}
                        className={`p-8 rounded-2xl border transition-all hover:-translate-y-1 ${service.highlight
                                ? 'bg-accent/5 border-accent/20 hover:border-accent/40'
                                : 'bg-white/5 border-white/5 hover:border-white/10'
                            }`}
                    >
                        <h3 className={`text-xl font-bold mb-4 ${service.highlight ? 'text-accent' : 'text-foreground'}`}>
                            {service.title}
                        </h3>
                        <p className="text-foreground/60 mb-6 leading-relaxed">
                            {service.description}
                        </p>
                        <div className="text-sm font-medium text-foreground/40 border-t border-white/5 pt-4">
                            {service.outcome}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
