import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart } from "lucide-react";


export default function ShopByCategory({ categories, handleNavigate, isVisible }) {
   
    
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-rose-50/30 to-amber-50/50"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-rose-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-rose-400 mr-4"></div>
            <Sparkles className="w-6 h-6 text-rose-500 mx-2" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-rose-400 ml-4"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-6 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collections designed to capture and preserve your most precious moments
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((categoryItem, index) => (
            <motion.div
              key={categoryItem.id}
              initial={{ opacity: 0, y: 40, rotateY: -10 }}
              animate={
                isVisible
                  ? {
                      opacity: 1,
                      y: 0,
                      rotateY: 0,
                      transition: {
                        delay: index * 0.15,
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      },
                    }
                  : {}
              }
              whileHover={{
                y: -15,
                rotateY: 5,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              className="cursor-pointer group perspective-1000"
              onClick={() => handleNavigate(categoryItem)}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/10 group-hover:border-rose-300/50">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative overflow-hidden h-64">
                    <motion.img
                      src={categoryItem.image}
                      alt={categoryItem.label}
                      className="w-full h-full object-cover transition-all duration-700"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent group-hover:from-rose-900/60 transition-all duration-500"></div>

                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Heart className="w-5 h-5 text-white" />
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {categoryItem.label}
                      </h3>
                      <div className="w-12 h-1 bg-rose-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col bg-gradient-to-br from-white to-slate-50/50">
                    <div className="flex-grow">
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        Preserve precious memories with our expertly crafted{" "}
                        {categoryItem.label.toLowerCase()} collections
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                        Explore Collection
                      </span>
                      <motion.div
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-100 to-orange-100 flex items-center justify-center group-hover:from-rose-500 group-hover:to-orange-500 transition-all duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <motion.span
                          className="text-rose-600 group-hover:text-white transition-colors duration-300"
                          animate={{ x: [0, 3, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
