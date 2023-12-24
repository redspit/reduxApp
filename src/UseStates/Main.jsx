import React from 'react';
import Lists from "./Lists"
import ObjectsStates from "./objects"
import NestedObjects from "./NestedObjects"
import { motion } from "framer-motion"
const Main = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className='flex flex-col gap-5 mt-5'
        >
            <Lists />
            <ObjectsStates />
            <NestedObjects/>
        </motion.div>
    )
}

export default Main