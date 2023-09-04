import AuthForm from "../components/AuthForm";
import JillsRoom from "../components/JillsRoom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Stats, OrbitControls } from '@react-three/drei'
import { Environment } from '@react-three/drei'
function AuthPage() {

    return (
        <>
            <AuthForm />
            <div className="h-screen">
                <Canvas>
                    <Suspense fallback={null}>
                        <JillsRoom />
                        <ambientLight />
                    </Suspense>
                    <OrbitControls />
                    <Stats />
                </Canvas>
            </div>
            </>

    );
}

export default AuthPage;