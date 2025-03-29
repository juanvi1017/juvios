import React, { useState, useEffect } from "react";


const Header = ({ setDev }: { setDev: (arg0: boolean) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState(1);

  const [dateTime, setDateTime] = useState({
    year: 1,
    month: 1,
    day: 1,
    hours: 1,
    minutes: 1,
    seconds: 1,
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dev = () => {
    setDev(true);
    setIsOpen(!isOpen);
  }

  const updateDateTime = () => {
    const now = new Date();
    setDateTime({
      year: now.getFullYear(),
      month: now.getMonth() + 1, // Los meses en JavaScript van de 0 a 11.
      day: now.getDate(), // Usa `getDate()` para el día.
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    });
  };

  useEffect(() => {
    const intervalId = setInterval(updateDateTime, 1000); // Actualiza cada segundo.
    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente.
  }, []);

  return (
    <header className="sticky top-0 z-999 flex w-full shadow min-h-10 max-h-50 bg-gray-100 dark">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="block sm:w-1/2">
          <div className="relative inline-block text-left">
            {/* Botón para abrir/cerrar el menú */}
            <button
              onClick={toggleMenu}
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4
              focus:ring-purple-300 font-medium text-sm px-5 py-2.5 mb-2 w-30 h-10"
            >
              JuviOS
            </button>

            {/* Opciones del menú con transición */}
            <div
              className={`flex absolute ring-opacity-5 transform transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                }`}
            >
              <div className="flex flex-col items-center w-16 h-100 py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700">
                <p onClick={() => setOption(1)} style={{ marginTop: '30px' }} className={`w-10 h-10 text-purple-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-blue-100 flex flex-col items-center justify-center ${option === 1 ? 'bg-blue-100' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </p>

                {/* <a href="#" className="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                    </svg>
                  </a>

                  <a href="#" className="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                  </a> */}

                <p onClick={() => setOption(2)} style={{ marginTop: '30px' }} className={`w-10 h-10 text-purple-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-blue-100 flex flex-col items-center justify-center ${option === 2 ? 'bg-blue-100' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </p>

                <p onClick={() => setOption(3)} style={{ marginTop: '30px' }} className={`w-10 h-10 text-purple-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-blue-100 flex flex-col items-center justify-center ${option === 3 ? 'bg-blue-100' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </p>
              </div>

              <div className="h-100 py-8 overflow-y-auto bg-white border-l border-r border-gray-300 w-80">
                <div className="mt-8 space-y-4">
                {option === 1 && (
                     <div className="flex flex-col items-center w-full transition-colors duration-200 gap-x-2 hover:bg-gray-100 focus:outline-none p-2">
                     <img src="/logo.webp" alt="logo" className="w-full h-60" />
                     <p className="mt-2 text-center text-purple-700 font-bold ">Juvi OS.</p>
                   </div>
                  )}
                  {option === 2 && (
                    <button className="flex items-center w-full  transition-colors duration-200 gap-x-2 hover:bg-gray-100 focus:outline-none" style={{ padding: '10px 0px 10px 10px' }}>
                      <div className="text-left rtl:text-right">
                        <h1 className="text-gray-900 capitalize">Themes</h1>
                        <p className="text-gray-500">Configuración de tema</p>
                      </div>
                    </button>
                  )}
                  {option === 3 && (
                    <>
                      <h2 className="px-5 text-lg font-medium text-gray-800" style={{ margin: '10px 0px 0px 10px' }}>System information</h2>
                      <div className="flex items-center justify-center grid grid-cols-2">
                        <div className="max-w-sm h-50 w-full overflow-hidden">
                          <div className="p-5 space-y-4" style={{ margin: '10px 0px 0px 10px' }}>
                            <div>
                              <h3 className="font-bold text-gray-900">Edition</h3>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">Version</h3>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">Created by</h3>
                            </div>
                          </div>
                        </div>
                        <div className="max-w-sm w-full h-50 bg-white overflow-hidden" style={{ paddingTop: '15px' }}>
                          <div className="p-5 space-y-4">
                            <div>
                              <h3 className="text-xs text-gray-900">JuviOS</h3>
                            </div>
                            <div>
                              <h3 className="text-xs text-gray-900" style={{ marginTop: '7px' }}>1.0.0</h3>
                            </div>
                            <div onClick={() => dev()}>
                              <h3 className="text-xs text-gray-900 cursor-pointer" style={{ marginTop: '7px' }}>Ing. Juan Caceres Miranda</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="text-white text-right" style={{marginRight: '5px'}}>
        <p className="text-sm">{dateTime.day}/{dateTime.month}/{dateTime.year}</p>
        <p className="text-xs">{dateTime.hours}:{dateTime.minutes}:{dateTime.seconds}</p>
      </div>
    </header>
  );
};

export default Header;
