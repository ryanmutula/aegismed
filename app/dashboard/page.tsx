'use client';
import Link from 'next/link';
import { 
  FlaskConical, Activity, BookOpen, Pill, Stethoscope, 
  Microscope, ShieldAlert, HeartPulse, Building2, BrainCircuit, 
  Scale, FileText, Leaf, Utensils, Baby, Radiation, 
  Cpu, Award, Database, Globe, 
  TestTubes, Atom, Beaker, Dna, Brain, 
  Syringe, ClipboardPlus, Scissors, Users, Bed, 
  Bandage, Home, Heart, Layers, Fingerprint, 
  BarChart, BriefcaseMedical, Bug, Ambulance 
} from 'lucide-react';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function Dashboard() {
  const units = [
    // --- Original 20 Units ---
    {
      title: "Pharmacology & Therapeutics",
      slug: "pharmacology-and-therapeutics",
      description: "Mechanisms of action, clinical pharmacy practices, and medicinal chemistry.",
      icon: <FlaskConical className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Clinical Assessment & Diagnostics",
      slug: "clinical-assessment",
      description: "Physical examinations, triage, and interpreting diagnostic laboratory results.",
      icon: <Activity className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Human Anatomy & Physiology",
      slug: "human-anatomy",
      description: "Systems-based overview of the human body and functional structures.",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Pharmaceutics & Dosage Form Design",
      slug: "pharmaceutics",
      description: "Formulation science, drug delivery systems, and compounding principles.",
      icon: <Pill className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Clinical Pharmacokinetics",
      slug: "clinical-pharmacokinetics",
      description: "Mathematical modeling of ADME parameters and therapeutic drug monitoring.",
      icon: <BrainCircuit className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Pharmaceutical Microbiology & Immunology",
      slug: "pharmaceutical-microbiology",
      description: "Aseptic processing, antimicrobial stewardship, and host defenses.",
      icon: <Microscope className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Hospital & Community Pharmacy Practice",
      slug: "hospital-community-pharmacy",
      description: "Dispensing workflows, inventory management, and patient counseling.",
      icon: <Building2 className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Toxicology & Poison Management",
      slug: "toxicology",
      description: "Identification and management of acute poisonings and xenobiotic toxicity.",
      icon: <ShieldAlert className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Pharmacotherapy & Disease Management",
      slug: "pharmacotherapy",
      description: "Evidence-based therapeutic guidelines for chronic and acute pathologies.",
      icon: <HeartPulse className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Biopharmaceutics",
      slug: "biopharmaceutics",
      description: "Physicochemical properties of drugs and their in-vivo bioavailability.",
      icon: <Stethoscope className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Pharmaceutical Jurisprudence & Ethics",
      slug: "pharmaceutical-jurisprudence",
      description: "Pharmacy laws, regulatory frameworks, and clinical ethics in healthcare.",
      icon: <Scale className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Pharmacoeconomics & Drug Policy",
      slug: "pharmacoeconomics",
      description: "Cost-benefit analysis of medications and national healthcare procurement.",
      icon: <FileText className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Medicinal Natural Products (Pharmacognosy)",
      slug: "pharmacognosy",
      description: "Phytochemical screening, herbal medicines, and plant-derived drugs.",
      icon: <Leaf className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Clinical Nutrition & Therapeutics",
      slug: "clinical-nutrition",
      description: "Enteral and parenteral nutrition support in clinical care settings.",
      icon: <Utensils className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Paediatric & Geriatric Pharmacy",
      slug: "paediatric-geriatric-pharmacy",
      description: "Specialized pharmacokinetics and dosage adjustments for vulnerable populations.",
      icon: <Baby className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Oncology Pharmacy & Supportive Care",
      slug: "oncology-pharmacy",
      description: "Cytotoxic drug handling, antineoplastic protocols, and palliative care.",
      icon: <Radiation className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Advanced Drug Delivery Systems",
      slug: "advanced-drug-delivery",
      description: "Nanotechnology, targeted drug delivery, and sustained-release polymers.",
      icon: <Cpu className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Clinical Research & Drug Regulation",
      slug: "clinical-research",
      description: "Clinical trial design, GCP guidelines, and regulatory dossier submissions.",
      icon: <Award className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Digital Health & Pharmacy Informatics",
      slug: "pharmacy-informatics",
      description: "Health information systems, electronic prescribing, and database architecture.",
      icon: <Database className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Global Public Health & Epidemiology",
      slug: "global-public-health",
      description: "Disease surveillance, vaccine distribution, and international health policy.",
      icon: <Globe className="w-6 h-6 text-primary" />,
      progress: 0,
    },

    // --- New 20 Units (Medicine, Nursing & Core Sciences) ---
    {
      title: "Organic Chemistry",
      slug: "organic-chemistry",
      description: "Carbon compounds, reaction mechanisms, and stereochemistry in drug design.",
      icon: <TestTubes className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Physical & Inorganic Chemistry",
      slug: "physical-inorganic-chemistry",
      description: "Thermodynamics, kinetics, and essential trace elements in biological systems.",
      icon: <Atom className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Pharmaceutical Analysis & QC",
      slug: "pharmaceutical-analysis",
      description: "Chromatography, spectroscopy, and quality assurance of medical products.",
      icon: <Beaker className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Medical Biochemistry",
      slug: "medical-biochemistry",
      description: "Metabolic pathways, enzyme kinetics, and molecular genetics.",
      icon: <Dna className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Behavioral Sciences & Psychiatry",
      slug: "behavioral-sciences",
      description: "Psychopathology, neurobiology of mental illness, and psychopharmacology.",
      icon: <Brain className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "General & Systemic Pathology",
      slug: "general-pathology",
      description: "Cellular injury, inflammation, and disease mechanisms at the tissue level.",
      icon: <Syringe className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Internal Medicine",
      slug: "internal-medicine",
      description: "Diagnosis and non-surgical management of complex systemic diseases.",
      icon: <ClipboardPlus className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "General Surgery & Anesthesiology",
      slug: "general-surgery",
      description: "Perioperative care, surgical principles, and anesthetic pharmacology.",
      icon: <Scissors className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Obstetrics & Gynecology",
      slug: "obstetrics-gynecology",
      description: "Maternal-fetal medicine, reproductive endocrinology, and labor management.",
      icon: <Users className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Foundations of Nursing Practice",
      slug: "nursing-foundations",
      description: "Core nursing skills, patient hygiene, vitals, and holistic care models.",
      icon: <Bed className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Medical-Surgical Nursing",
      slug: "medical-surgical-nursing",
      description: "Specialized care for adult patients managing acute and chronic illnesses.",
      icon: <Bandage className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Community Health Nursing",
      slug: "community-health-nursing",
      description: "Preventative care, family health, and community-level interventions.",
      icon: <Home className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Midwifery & Reproductive Health",
      slug: "midwifery",
      description: "Antenatal care, safe delivery practices, and postpartum management.",
      icon: <Heart className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Histology & Embryology",
      slug: "histology-embryology",
      description: "Microscopic anatomy of tissues and human developmental biology.",
      icon: <Layers className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Forensic Medicine & Jurisprudence",
      slug: "forensic-medicine",
      description: "Medicolegal investigations, trauma pathology, and medical law.",
      icon: <Fingerprint className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Biostatistics & Research Methodology",
      slug: "biostatistics",
      description: "Data analysis, probability, and designing robust clinical studies.",
      icon: <BarChart className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Health Systems Management",
      slug: "health-systems-management",
      description: "Healthcare administration, leadership, and operational efficiency.",
      icon: <BriefcaseMedical className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Parasitology & Medical Entomology",
      slug: "parasitology",
      description: "Study of human parasites, vectors, and anti-parasitic therapies.",
      icon: <Bug className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Tropical Medicine & Infectious Diseases",
      slug: "tropical-medicine",
      description: "Endemic diseases, virology, and public health in tropical climates.",
      icon: <Syringe className="w-6 h-6 text-primary" />,
      progress: 0,
    },
    {
      title: "Emergency Medicine & Trauma Care",
      slug: "emergency-medicine",
      description: "Advanced life support, disaster management, and critical triage.",
      icon: <Ambulance className="w-6 h-6 text-primary" />,
      progress: 0,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      {/* Top Navigation / Controls */}
      <div className="flex justify-between items-center mb-10 pb-4 border-b border-border">
        <div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Curriculum Modules</h1>
          <p className="text-foreground/70 mt-1">Select any of the 40 units to access notes, quizzes, and your AI tutor.</p>
        </div>
        <ThemeSwitcher />
      </div>

      {/* The 40-Unit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {units.map((unit) => (
          <Link 
            key={unit.slug}
            href={`/dashboard/units/${unit.slug}`}
            className="group relative flex flex-col p-6 rounded-2xl bg-accent border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 rounded-xl bg-background shadow-sm group-hover:scale-110 transition-transform duration-300">
                {unit.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground leading-snug">{unit.title}</h3>
            </div>
            
            <p className="text-sm text-foreground/80 flex-grow mb-6 leading-relaxed">
              {unit.description}
            </p>

            <div className="w-full bg-background rounded-full h-2 mb-2 overflow-hidden border border-border">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${unit.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-secondary font-semibold text-right">
              {unit.progress}% Completed
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}