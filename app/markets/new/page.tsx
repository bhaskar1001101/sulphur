// 'use client'

// import { useState } from 'react'
// import { useOkto, type OktoContextType } from 'okto-sdk-react'
// import { ethers } from 'ethers'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/components/ui/use-toast"

// // We can move this to a constants file later
// const MARKET_FACTORY_ADDRESS = "YOUR_FACTORY_ADDRESS"
// const MARKET_FACTORY_ABI = [
//   {
//     "inputs": [
//       {
//         "internalType": "string",
//         "name": "_statement",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_yes",
//         "type": "string"
//       },
//       {
//         "internalType": "string",
//         "name": "_no",
//         "type": "string"
//       }
//     ],
//     "name": "createMarket",
//     "outputs": [],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [],
//     "name": "createFee",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ]

// export default function CreateMarketPage() {
//   const { executeRawTransaction } = useOkto() as OktoContextType
//   const { toast } = useToast()
  
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     statement: '',
//     yesDescription: '',
//     noDescription: '',
//   })

//   const handleInputChange = (field: keyof typeof formData) => (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: e.target.value
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       // Create interface for encoding
//       const iface = new ethers.Interface(MARKET_FACTORY_ABI)
      
//       // Encode the function call
//       const data = iface.encodeFunctionData("createMarket", [
//         formData.statement,
//         formData.yesDescription,
//         formData.noDescription
//       ])

//       // Get the create fee first
//       const createFeeData = iface.encodeFunctionData("createFee")
//       const response = await executeRawTransaction({
//         network_name: "POLYGON_TESTNET",
//         transaction: {
//           to: MARKET_FACTORY_ADDRESS,
//           data: createFeeData
//         }
//       })

//       // Execute the create market transaction
//       const tx = await executeRawTransaction({
//         network_name: "POLYGON_TESTNET",
//         transaction: {
//           to: MARKET_FACTORY_ADDRESS,
//           data,
//           value: response // Use the fetched create fee
//         }
//       })

//       toast({
//         title: "Market Created!",
//         description: "Your prediction market has been created successfully.",
//       })

//       // Reset form
//       setFormData({
//         statement: '',
//         yesDescription: '',
//         noDescription: '',
//       })

//     } catch (error: any) {
//       toast({
//         title: "Error Creating Market",
//         description: error.message || "Something went wrong",
//         variant: "destructive"
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="container max-w-2xl py-10">
//       <Card className="bg-slate-900/95 border-slate-800">
//         <CardHeader>
//           <CardTitle>Create New Market</CardTitle>
//           <CardDescription>
//             Create a new prediction market. You will need to pay a creation fee.
//           </CardDescription>
//         </CardHeader>

//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="statement">Market Question</Label>
//               <Textarea
//                 id="statement"
//                 placeholder="What are you predicting? Be specific."
//                 value={formData.statement}
//                 onChange={handleInputChange('statement')}
//                 className="bg-slate-800/50 border-slate-700 focus:border-slate-600"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="yesDescription">"Yes" Outcome Description</Label>
//               <Input
//                 id="yesDescription"
//                 placeholder="Define what constitutes a 'Yes'"
//                 value={formData.yesDescription}
//                 onChange={handleInputChange('yesDescription')}
//                 className="bg-slate-800/50 border-slate-700 focus:border-slate-600"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="noDescription">"No" Outcome Description</Label>
//               <Input
//                 id="noDescription"
//                 placeholder="Define what constitutes a 'No'"
//                 value={formData.noDescription}
//                 onChange={handleInputChange('noDescription')}
//                 className="bg-slate-800/50 border-slate-700 focus:border-slate-600"
//                 required
//               />
//             </div>
//           </CardContent>

//           <CardFooter>
//             <Button 
//               type="submit" 
//               className="w-full bg-emerald-500 hover:bg-emerald-600"
//               disabled={isLoading}
//             >
//               {isLoading ? "Creating Market..." : "Create Market"}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   )
// }