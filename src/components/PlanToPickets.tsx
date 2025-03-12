import React from 'react';
import { CalendarCheck, ClipboardCheck, Construction, PartyPopper } from 'lucide-react';

const PlanToPickets = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-secondary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-texas-terracotta/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-texas-earth/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-6 py-2 bg-texas-terracotta/10 rounded-full text-texas-terracotta text-sm font-medium mb-4">
            Our Proven Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-texas-earth to-texas-terracotta bg-clip-text text-transparent">
            Our "Plan to Pickets" Process
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            It all begins with an idea. Maybe you want to have that perfect backyard oasis. 
            Maybe you want to host a great barbecue party. Maybe you want to protect what you love. 
            Whatever it is, this simple 4-step plan will ensure your success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden group border border-white/20 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-texas-terracotta/10 rounded-bl-full -mr-12 -mt-12 transition-all duration-500 group-hover:bg-texas-terracotta/20 group-hover:scale-110"></div>
            <div className="w-20 h-20 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-6 text-texas-terracotta group-hover:bg-texas-terracotta/30 transition-all duration-300">
              <CalendarCheck size={36} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-2 text-9xl font-bold text-gray-100 select-none group-hover:text-gray-200 transition-colors duration-300">1</div>
              <h3 className="text-2xl font-bold mb-3 relative">Schedule Estimate</h3>
              <p className="text-muted-foreground relative">
                Scheduling an estimate is easy; you can do it online. Our professional estimators will show up at your designated time. 
                While there we will discuss your project needs and the style you want. Whether it's board-on-board, wrought iron, horizontal, 
                pool fencing, or automatic gates, we have the design expertise to easily walk you through the process resulting in a beautiful fence you'll love.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden group border border-white/20 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-texas-terracotta/10 rounded-bl-full -mr-12 -mt-12 transition-all duration-500 group-hover:bg-texas-terracotta/20 group-hover:scale-110"></div>
            <div className="w-20 h-20 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-6 text-texas-terracotta group-hover:bg-texas-terracotta/30 transition-all duration-300">
              <ClipboardCheck size={36} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-2 text-9xl font-bold text-gray-100 select-none group-hover:text-gray-200 transition-colors duration-300">2</div>
              <h3 className="text-2xl font-bold mb-3 relative">Place Your Order</h3>
              <p className="text-muted-foreground relative">
                Once you place your order and provide your home survey, Fences Texas takes it from there. 
                Our team will file for necessary permits and have local utility companies mark active lines.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden group border border-white/20 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-texas-terracotta/10 rounded-bl-full -mr-12 -mt-12 transition-all duration-500 group-hover:bg-texas-terracotta/20 group-hover:scale-110"></div>
            <div className="w-20 h-20 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-6 text-texas-terracotta group-hover:bg-texas-terracotta/30 transition-all duration-300">
              <Construction size={36} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-2 text-9xl font-bold text-gray-100 select-none group-hover:text-gray-200 transition-colors duration-300">3</div>
              <h3 className="text-2xl font-bold mb-3 relative">Installation</h3>
              <p className="text-muted-foreground relative">
                Before your installation we will notify you when you are the next project in line and again the day before we come out. 
                On the day of installation you will be greeted by our installation team and we will start building that great fence or gate. 
                Fences Texas performs quality checks on all of our jobs. So once installation is complete your project manager will come out 
                for a final walk though and check to make sure installation meets our highest standards.
              </p>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden group border border-white/20 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-texas-terracotta/10 rounded-bl-full -mr-12 -mt-12 transition-all duration-500 group-hover:bg-texas-terracotta/20 group-hover:scale-110"></div>
            <div className="w-20 h-20 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-6 text-texas-terracotta group-hover:bg-texas-terracotta/30 transition-all duration-300">
              <PartyPopper size={36} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-2 text-9xl font-bold text-gray-100 select-none group-hover:text-gray-200 transition-colors duration-300">4</div>
              <h3 className="text-2xl font-bold mb-3 relative">Enjoy Your New Yard</h3>
              <p className="text-muted-foreground relative">
                It's time to show off that new backyard look by celebrating. We recommend inviting all of the neighbors over, 
                grabbing some good meats from the store, tossing some cold ones in the cooler, bringing out the yard games, 
                and putting on some good music!
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative dotted line connecting the steps (visible on larger screens) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 z-0 mt-14">
          <div className="container mx-auto px-8">
            <div className="relative h-1 w-full">
              <div className="absolute inset-0 flex">
                <div className="w-full h-full border-t-2 border-dashed border-texas-terracotta/40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanToPickets;
