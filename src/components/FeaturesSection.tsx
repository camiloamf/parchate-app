export default function FeaturesSection() {
    return (
        <section id="features" className="bg-[#171717] text-white py-10 px-4 flex flex-col items-center">
            <div className="max-w-[90%] w-full mx-auto">
                <h2 className="text-[24px] font-bold mb-6 md:mb-14 text-center">
                    ¿Desparchado? ¡Aquí te lo armamos!
                </h2>

                <div className="border-6 border-[#820263] rounded-3xl p-6 text-center md:border-none md:p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-6">
                        <div className="md:border-2 md:border-[#820263] md:rounded-3xl md:p-6 md:mx-8">
                            <img src="/icons/volunteer_activism.png" alt="Eventos" className="w-24 h-24 mx-auto mb-8" />
                            <h3 className="text-[24px] font-bold mb-2">Eventos seleccionados con amor</h3>
                            <p className="text-gray-300 text-[16px]">Encontramos eventos que resuenen contigo</p>
                        </div>

                        <div className="md:border-2 md:border-[#820263] md:rounded-3xl md:p-6 md:mx-8">
                            <img src="/icons/person_play.png" alt="Gustos" className="w-24 h-24 mx-auto mb-8" />
                            <h3 className="text-[24px] font-bold mb-2">Para todos los gustos e intereses</h3>
                            <p className="text-gray-300 text-[16px]">Desde rumbas épicas hasta tardeaditas tranquilas</p>
                        </div>

                        <div className="md:border-2 md:border-[#820263] md:rounded-3xl md:p-6 md:mx-8">
                            <img src="/icons/self_improvement.png" alt="Explora" className="w-24 h-24 mx-auto mb-8" />
                            <h3 className="text-[24px] font-bold mb-2">Piensa, explora, ¡arma parche!</h3>
                            <p className="text-gray-300 text-[16px]">Todo en un solo lugar, diseñado para tu comodidad</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}  