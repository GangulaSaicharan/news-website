import { Metadata } from "next";

import HomeComponent from "./components/home-component";

export const metadata: Metadata = {
  title: "Home : Application",
  description: "...",
};

const Home = () => {
  return <HomeComponent />;
};

export default Home;
