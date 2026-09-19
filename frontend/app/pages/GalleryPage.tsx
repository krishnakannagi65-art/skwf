import { useRef, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "~/context/LanguageContext";
import { t } from "~/i18n/translations";
import { useProjects } from "~/hooks/useData";

export function GalleryPage() {
  const { lang } = useLanguage();
  const { projects, loading } = useProjects();
  const [activeProject, setActiveProject] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches[0]) handleMove(e.touches[0].clientX);
    };
    const handleUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-wood-300 border-t-wood-700 rounded-full animate-spin" />
      </div>
    );
  }

  const project = projects[activeProject];
  if (!project) return null;

  const title =
    lang === "ta" && project.title_ta ? project.title_ta : project.title;
  const description =
    lang === "ta" && project.description_ta
      ? project.description_ta
      : project.description;

  return (
    <div className="min-h-screen">
      <div className="bg-wood-900 text-white py-16 relative overflow-hidden">
        <div className="grain-bg absolute inset-0 opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles size={28} className="text-gold-400" />
            <span className="h-px w-12 bg-gold-500" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-white">
            {t("gallery_title", lang)}
          </h1>
          <p className="text-wood-300 mt-3 text-lg">
            {t("gallery_subtitle", lang)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Before/After slider */}
        <div className="mb-8">
          <div
            ref={containerRef}
            className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize select-none"
            onMouseDown={(e) => {
              isDragging.current = true;
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              isDragging.current = true;
              if (e.touches[0]) handleMove(e.touches[0].clientX);
            }}
          >
            {/* After (background) */}
            <img
              src={project.after_image}
              alt={t("gallery_after", lang)}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Before (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={project.before_image}
                alt={t("gallery_before", lang)}
                className="absolute inset-0 h-full object-cover"
                style={{ width: containerRef.current?.clientWidth || "100%" }}
              />
            </div>

            {/* Labels */}
            <span className="absolute top-4 left-4 px-3 py-1.5 bg-wood-900/80 text-white text-sm font-medium rounded-full backdrop-blur-sm">
              {t("gallery_before", lang)}
            </span>
            <span className="absolute top-4 right-4 px-3 py-1.5 bg-gold-500 text-wood-950 text-sm font-semibold rounded-full backdrop-blur-sm">
              {t("gallery_after", lang)}
            </span>

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="flex gap-0.5">
                  <span className="text-wood-700 text-xs">◀</span>
                  <span className="text-wood-700 text-xs">▶</span>
                </div>
              </div>
            </div>

            {/* Drag hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-wood-900/80 text-white text-xs rounded-full backdrop-blur-sm">
              {t("gallery_drag", lang)}
            </div>
          </div>
        </div>

        {/* Project info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-wood-900 mb-2">
              {title}
            </h2>
            <p className="text-wood-600 leading-relaxed">{description}</p>
          </div>
          <div className="card p-4">
            <div className="text-xs text-wood-400 mb-1">
              {lang === "ta" ? "இடம்" : "Location"}
            </div>
            <p className="font-medium text-wood-800">{project.location}</p>
            <div className="text-xs text-wood-400 mt-3 mb-1">
              {lang === "ta" ? "அறை வகை" : "Room Type"}
            </div>
            <p className="font-medium text-wood-800">{project.room_type}</p>
          </div>
        </div>

        {/* Project thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveProject(i);
                setSliderPos(50);
              }}
              className={`group relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                i === activeProject
                  ? "border-wood-700 scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={p.after_image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-950/80 to-transparent" />
              <p className="absolute bottom-2 left-2 right-2 text-xs text-white font-medium text-left">
                {lang === "ta" && p.title_ta ? p.title_ta : p.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
