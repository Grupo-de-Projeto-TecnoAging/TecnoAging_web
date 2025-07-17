import Button from "@/components/ui/button/Button";

const { default: Card } = require("@/components/card");

function DataExport() {
    return (
        <Card.Root 
            className="relative overflow-hidden rounded-2xl w-full h-full 
            border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] 
            md:p-6 justify-between">
            <Card.Content
                content="Exportar Dados"
                className="text-center"
            />
            <Card.Icon className="flex items-center justify-center w-full ">
                <div className="w-40 h-1.5 bg-gray-200 rounded-2xl"></div>
            </Card.Icon>
            <Button
                onClick={() => alert("Exportação iniciada!")}
            > Exportar </Button>
        </Card.Root>
    )
}

export default DataExport;