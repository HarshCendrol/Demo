import VIForegroundService from '@voximplant/react-native-foreground-service';
import React, { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import BackgroundService from 'react-native-background-actions'

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log(i);
            
            await sleep(delay);
        }
    });
};


const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 1000,
    },
};

const MyNewService = () => {


    

    useEffect(() => {
        createChannel();
    }, [])


    const createChannel = async () => {
        const channelConfig = {
            id: 'channelId',
            name: 'Channel name',
            description: 'Channel description',
            enableVibration: false
        };
        await VIForegroundService.getInstance().createNotificationChannel(channelConfig);
    }



    const startForegroundService = async () => {
        const notificationConfig = {
            channelId: 'channelId',
            id: 3456,
            title: 'Title',
            text: 'Some text',
            icon: 'ic_icon',
            button: 'Some text',
        };
        try {
            await VIForegroundService.getInstance().startService(notificationConfig);
        } catch (e) {
            console.error(e);
        }
    }


    const stopForeground = async () => {
        await VIForegroundService.getInstance().stopService();

    }



    const startBackgroundService = async () => {
        await BackgroundService.start(veryIntensiveTask, options);
    }


    const UpdateBackgroundServiceNoti = async () => {
        await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description' });
    }


    const stopBackgroundService = async () => {
        await BackgroundService.stop();
    }

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Pressable onPress={startForegroundService} style={{ marginBottom: 10, marginTop: 10, padding: 10, backgroundColor: "blue" }}><Text style={{ color: "#ffff" }}>Start Foreground service</Text></Pressable>
            <Pressable onPress={stopForeground} style={{ marginBottom: 10, marginTop: 10, padding: 10, backgroundColor: "blue" }}><Text style={{ color: "#ffff" }}>Stop Foreground service</Text></Pressable>
            <Pressable onPress={startBackgroundService} style={{ marginBottom: 10, marginTop: 10, padding: 10, backgroundColor: "red" }}><Text style={{ color: "#ffff" }}>Start Background service</Text></Pressable>
            <Pressable onPress={stopBackgroundService} style={{ marginBottom: 10, marginTop: 10, padding: 10, backgroundColor: "red" }}><Text style={{ color: "#ffff" }}>Stop Background service</Text></Pressable>
        </View>
    )
}

export default MyNewService