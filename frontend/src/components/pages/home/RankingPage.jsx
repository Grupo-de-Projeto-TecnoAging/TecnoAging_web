import RankingTable from "./RankingTable";

export default function RankingPage({ data }) {
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-6">
                <RankingTable title="Ranking 5TSTS" data={data.fiveTSTS} />
            </div>

            <div className="col-span-12 xl:col-span-6">
                <RankingTable title="Ranking TUG" data={data.tug} />
            </div>
        </div>
    );
}
