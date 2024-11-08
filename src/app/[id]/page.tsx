// app/[id]/page.tsx

import { MongoClient, ObjectId } from "mongodb"; // Import ObjectId
import Header from "@/components/HeaderCom";
import PremiumAccessScreen from "@/components/PremiumAdCountdown/PremiumAdCountdown";

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
                    <PremiumAccessScreen />
                </main >

            </div >

        </div >
    );
};

export default PasterDetail;