import AuthForm from "../components/AuthForm";
import JillsRoom from "../components/JillsRoom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Stats, OrbitControls } from '@react-three/drei'
import { Effects } from "@react-three/drei";

function AuthPage() {
    const target = [0, 4, 0];
    const cameraPosition = [8, 7, -6];
    return (
        <div className="flex">
            <div className='w-1/3 p-4 lg:p-14'>
                <AuthForm />
            </div>
            <div className="h-screen w-screen">
                <Canvas 
                    antialias={true}
                    pixelRatio={[1, 2]}
                    rotation={[30, 0, 0]}
                    camera={{ fov: 70, position: cameraPosition }}>
                    <Effects antialias={true} />
                    <Suspense fallback={null}>
                        <JillsRoom />
                        <ambientLight color={'white'} intensity={2.0} />
                    </Suspense>
                    <OrbitControls target={target} />
                    <Stats />
                </Canvas>
            </div>
        </div>

    );
}

export default AuthPage;