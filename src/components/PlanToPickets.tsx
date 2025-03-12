
import React from 'react';
import { CalendarCheck, ClipboardCheck, Construction, PartyPopper } from 'lucide-react';

const PlanToPickets = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our "Plan to Pickets" Process</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            It all begins with an idea. Maybe you want to have that perfect backyard oasis. 
            Maybe you want to host a great barbecue party. Maybe you want to protect what you love. 
            Whatever it is, this simple 4-step plan will ensure your success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-texas-terracotta/10 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-texas-terracotta/20"></div>
            <div className="w-16 h-16 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-6 text-texas-terracotta">
              <CalendarCheck size={32} />
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-2 text-8xl font-bold text-gray-100 select-none">1</div>
              <h3 className="text-xl font-bold mb-3 relative">Schedule Estimate</h3>
              <p className="text-muted-foreground relative">
                Scheduling an estimate is easy; you can do it online. Our professional estimators will show up at your designated time. 
                While there we will discuss your project needs and the style you want. Whether it's board-on-board, wrought iron, horizontal, 
                pool fencing, or automatic gates, we have the design expertise to easily walk you through the process resulting in a beautiful fence you'll love.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-texas-terracotta/10 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-texas-terracotta/20"></div>
            <div className="w-16 h-16 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-6 text-texas-terracotta">
              <ClipboardCheck size={32} />
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-2 text-8xl font-bold text-gray-100 select-none">2</div>
              <h3 className="text-xl font-bold mb-3 relative">Place Your Order</h3>
              <p className="text-muted-foreground relative">
                Once you place your order and provide your home survey, Fences Texas takes it from there. 
                Our team will file for necessary permits and have local utility companies mark active lines.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-texas-terracotta/10 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-texas-terracotta/20"></div>
            <div className="w-16 h-16 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-6 text-texas-terracotta">
              <Construction size={32} />
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-2 text-8xl font-bold text-gray-100 select-none">3</div>
              <h3 className="text-xl font-bold mb-3 relative">Installation</h3>
              <p className="text-muted-foreground relative">
                Before your installation we will notify you when you are the next project in line and again the day before we come out. 
                On the day of installation you will be greeted by our installation team and we will start building that great fence or gate. 
                Fences Texas performs quality checks on all of our jobs. So once installation is complete your project manager will come out 
                for a final walk though and check to make sure installation meets our highest standards.
              </p>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-texas-terracotta/10 rounded-bl-full -mr-8 -mt-8 transition-all duration-300 group-hover:bg-texas-terracotta/20"></div>
            <div className="w-16 h-16 rounded-full bg-texas-terracotta/20 flex items-center justify-center mb-6 text-texas-terracotta">
              <PartyPopper size={32} />
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-2 text-8xl font-bold text-gray-100 select-none">4</div>
              <h3 className="text-xl font-bold mb-3 relative">Enjoy Your New Yard</h3>
              <p className="text-muted-foreground relative">
                It's time to show off that new backyard look by celebrating. We recommend inviting all of the neighbors over, 
                grabbing some good meats from the store, tossing some cold ones in the cooler, bringing out the yard games, 
                and putting on some good music!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanToPickets;
