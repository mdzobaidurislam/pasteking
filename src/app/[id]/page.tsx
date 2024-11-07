// app/[id]/page.tsx

import { MongoClient, ObjectId } from "mongodb"; // Import ObjectId
import { useEffect, useState } from "react";
import Header from "@/components/HeaderCom";

interface Paster {
    title: string;
    content: string;
    createdAt: string;
}

// Connect to MongoDB
async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI || "", {});
    await client.connect();
    return client;
}

// Fetch data by ID
const fetchPasterById = async (id: string): Promise<Paster | null> => {
    const client = await connectToDatabase();
    const database = client.db("pasterdb"); // Replace with your database name
    const pastersCollection = database.collection("pasters");
    const paster = await pastersCollection.findOne({ _id: new ObjectId(id) }); // Use ObjectId
    client.close();
    // return paster ? { ...paster, createdAt: paster.createdAt.toISOString() } : null;
    if (paster && 'title' in paster && 'content' in paster && 'createdAt' in paster) {
        return {
            title: paster.title,
            content: paster.content,
            createdAt: paster.createdAt.toISOString() // Ensure createdAt is a string
        };
    }

    return null; // Return null if the document is not found or lacks required fields
};

const PasterDetail = async ({ params }: { params: { id: string } }) => {
    const { id } = params; // Get the ID from the URL
    const paster = await fetchPasterById(id); // Fetch the document

    if (!paster) {
        return <p>No data found.</p>;
    }

    return (
        <div>
            <header className="border-b border-gray-100 flex justify-between px-8 h-[60px] font-sans">
                <Header />
            </header>
            <div className="flex">
                {/* {email && <SideBarCom />} */}
                <main className="container  max-w-7xl mx-auto px-16 ">
                    {/* <form onSubmit={handleSubmit}> */}
                        <div className="mt-14">
                            <input type="text" value={paster.title}  className=" border-2 rounded-md outline-0 text-white w-full mb-4 p-4 text-2xl  bg-transparent focus:bg-opacity-45 focus:bg-white transition-all" placeholder="Title" />
                            <textarea value={paster.title} placeholder="Add text..." className=" border-2 rounded-md w-full h-[50vh] p-2 text-white border-blue-100 outline-0 p-4 bg-transparent focus:bg-opacity-45 focus:bg-white transition-all "></textarea>
                        </div>
                        <div>
                            <div className="flex justify-between text-white mt-8 items-end">
                                <div className='flex flex-col gap-4'></div>
                                <div>
                                    <button type="submit" className='rounded-md bg-white text-gray-600 hover:bg-white hover:bg-opacity-25 hover:text-white transition-all p-2 px-4 cursor-default'>Create paste</button>
                                </div>
                            </div>
                        </div>
                    {/* </form> */}
                </main >

        </div >

        </div >
    );
};

export default PasterDetail;