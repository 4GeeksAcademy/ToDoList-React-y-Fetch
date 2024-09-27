import React, { useEffect, useState } from "react";
import List from "./list";
import Footer from "./footer";
import Buttom from "./buttom";

const footerData = [
	{
		githubURL: "https://github.com/Jumpvzl",
		name: "Juan Pablo Castillo",
		geeksName: "4geeksacademy",
		geeksURL: "https://www.4geeksacademy.com",
		imagenURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.NzJUc0PYtkgp7lfNKizmgQHaHB%26pid%3DApi&f=1&ipt=271cb3eb7e5f15522c250313a63e781bdb17fd428148a3cfa3fc136c7c118f42&ipo=images",
	},
];

const Home = () => {



	return (
		<div className="text-center" >
			<h1 className="title">ToDo List</h1>
			<List/>
			<Footer properties={footerData}/>
		</div>
	);
};

export default Home;
