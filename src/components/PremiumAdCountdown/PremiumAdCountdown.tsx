"use client"

// import { CountdownTimer } from '@/components/ui/countdown-timer';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import styles from './Premium.module.css'
import AddFree from './AddFree';

const PremiumAccessScreen = () => {
    const handleSkipPremium = () => {
        // Add your logic here to handle skipping the premium content
    };

    return (
        <div className={`${styles.page_ad_wrapper}`}>
            <Tabs defaultValue="free" className={`${styles.premium_ad_countdown_wrapper}`}>
                <TabsList className={`${styles.premium_ad_method_toggle_wrapper}`}>
                    <TabsTrigger className='w-1/2 ' value="free">Free access</TabsTrigger>
                    <TabsTrigger className='w-1/2 ' value="premium">Premium only access</TabsTrigger>
                </TabsList>
                <TabsContent value="free">
                    <AddFree />

                </TabsContent>
                <TabsContent value="premium">
                    <h1 className="text-2xl font-bold">Premium only access</h1>

                </TabsContent>
                <div className={styles.page_ad_wrapper_inner}></div>
            </Tabs>

        </div>
    );
};

const ActivateWindows = () => {
    useEffect(() => {
        // Code to open the Windows Settings app
    }, []);

    return (
        <p className="text-gray-400">
            Go to Settings to activate Windows
        </p>
    );
};

export default PremiumAccessScreen;