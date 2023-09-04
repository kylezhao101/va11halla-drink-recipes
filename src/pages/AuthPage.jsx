import AuthForm from "../components/AuthForm";
import JillsRoom from "../components/JillsRoom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

function AuthPage() {

    return (
        <>
         <AuthForm />
         <Canvas>
            <Suspense fallback={null}>
                <JillsRoom />
            </Suspense>
         </Canvas>
         
        </>

    );
}

export default AuthPage;