import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, Text, View, StyleSheet } from "react"
import { Camera } from "expo-camera"


const styles = StyleSheet.create({

})

export default function CameraInfo({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null)
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])


    if (hasPermission === null) {
        return <View />
    }

    if (hasPermission === false) {
        return <Text>Sem acesso a câmera</Text>
    }

    return (
        <View style={styles.container}>
            <Header title="camera" />
            <View>
                
                <Camera 
                ref={(ref) => setCameraRef(ref)}
                type={type}
                ratio="1:3"
                zoom={0}
                />
            </View>
            <Footer 
            onPress={() => navigation.goBack()}
            />
        </View>
    )
}