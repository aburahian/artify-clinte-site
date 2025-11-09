import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import { FaAmilia } from "react-icons/fa6";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 text-center px-4">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-[9rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-xl"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-xl md:text-2xl font-semibold text-gray-700 mt-2"
      >
        Oops... looks like you got lost in the
        <span className="flex items-center justify-center text-primary font-bold text-xl">
          <FaAmilia size={24} />
          <span className=" font-extrabold text-2xl">rtify</span>
        </span>
        🎨
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "6rem" }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="h-[3px] bg-primary rounded-full mt-4"
      ></motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-gray-500 mt-6"
      >
        The page you’re looking for doesn’t exist or was moved.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="flex items-center gap-2 bg-primary hover:bg-secondary text-white font-semibold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
        >
          <FaHome />
          Back to Home
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-secondary to-primary rounded-full blur-3xl"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tr from-primary to-secondary rounded-full blur-3xl"
      ></motion.div>
    </div>
  );
};

export default ErrorPage;
