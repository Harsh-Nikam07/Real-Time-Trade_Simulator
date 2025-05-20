import React from "react";
import StatusIndicator from "../components/StatusIndicator";
import EnhancedDashboardContent from "../components/EnhancedDashboardContent";

export default function Dashboard() {

    return (
        <div className={`w-full h-full bg-gray-50 dark:bg-zinc-950 transition-colors duration-200`}>
            {/* Header */}
            <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 w-full">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">GoQuant</div>
                            <div className="mx-2 text-gray-300 dark:text-gray-700">|</div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Live Trade Simulator</div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <StatusIndicator />
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Main content */}
            <EnhancedDashboardContent />
        </div>
    );
}