import React, { useEffect } from 'react'
import { View } from 'react-native'
import { accelerometer, gyroscope, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors';

const Filters = () => {
    let time = 5


    let x =[[0],[0]]
    const A = [[1, time], [0, 1]]
    let Ax = [[0],[0]]

    let B = [[1/2*(time^2)],[time]]
    let g = 9.8
    let Bg = [[0],[0]]

    //Gausian Noise 
    let W =[[0],[0]]

    //result
    let result = [[0],[0]]

    //acc array
    let acc = [[0],[0]]


    const accSensor = () => {
        setUpdateIntervalForType(SensorTypes.accelerometer, time*1000);
        const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>{
            for (let i = 0; i < array.length; i++) {
                acc[0][0] = x;
                acc[1][0] = y 
                console.log("acc",acc)
            }
                
            
        }
        );
    }
    // const gyroSensor = () => {
    //     setUpdateIntervalForType(SensorTypes.gyroscope, time*1000);

    //     const gyro = gyroscope.subscribe(({ x, y, z, timestamp }) =>
    //         console.log("gyroscope", x, y, z)
    //     );

    // }
    useEffect(() => {
        Ax[0][0] =x[0][0]*A[0][0] + x[1][0]* A[1][0]
        Ax[1][0] =x[0][0]*A[0][1] + x[1][0]* A[1][1] 
        console.log("AX",Ax)
        Bg[0][0] = B[0][0]*g
        Bg[1][0] = B[1][0]*g 
        console.log("BG", Bg)

        result[0][0] = Ax[0][0] + Bg[0][0] + W[0][0]
        result[1][0] = Ax[1][0] + Bg[1][0] + W[1][0]

    console.log("result", result)
    accSensor()
    }, [])

    return (
        <View>

        </View>
    )
}

export default Filters
