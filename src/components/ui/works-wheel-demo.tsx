import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

const WORKS: WorksWheelItem[] = [
  {
    title: "Kronos Automaton",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    href: "/work/kronos-horology",
  },
  {
    title: "Aether Spatial",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
    href: "/work/aether-spatial-audio",
  },
  {
    title: "Neo Noir Atelier",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    href: "/work/neo-noir-couture",
  },
  {
    title: "Vortex Aerodynamics",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    href: "/work/vortex-hypercars",
  },
  {
    title: "Synapse Neural",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    href: "/work/synapse-quantum",
  },
  {
    title: "ARC Architects",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    href: "/work/arc-spatial-structures",
  },
  {
    title: "Prismatic Rift",
    image: "https://images.unsplash.com/photo-1518131668685-6184852f8be2?auto=format&fit=crop&w=1200&q=80",
    href: "/work/kronos-horology",
  },
  {
    title: "Celestial Ray",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
    href: "/work/aether-spatial-audio",
  },
];

export function WorksWheelDemo() {
  return (
    <div className="bg-background text-foreground w-full h-[85vh] min-h-[500px]">
      <WorksWheel items={WORKS} label="Works '26" action="View" />
    </div>
  );
}

export default WorksWheelDemo;
