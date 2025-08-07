"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createCompanion } from "@/lib/actions/companion.actions"
import { redirect } from "next/navigation"

 



const formSchema = z.object({
  name: z.string().min(1,{message: 'companion reqiured'}),
  subject: z.string().min(1,{message: 'subject reqiured'}),
  topic: z.string().min(1,{message: 'topic reqiured'}),
  voice: z.string().min(1,{message: 'voice reqiured'}),
  style: z.string().min(1,{message: 'style reqiured'}),
  duration: z.number().min(1,{message: 'duration reqiured'}),
})

const CompanionForm = () => {
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companion = await createCompanion(values)
    if(companion){
      redirect(`/companions/${companion.id}`)
    }else{
      console.log("Failed to create a companion")
      redirect('/')
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Companions Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="enter the companion name" 
                {...field} 
                className="input" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
     <FormField
        control={form.control}
        name="subject"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subject</FormLabel>
            <FormControl>
                <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}         
                >
                    <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the subject" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map((subject) => (
                            <SelectItem 
                                value={subject} 
                                key={subject}
                                className="capitalize"
                            >
                                {subject}
                            </SelectItem>

                        ))}
                    </SelectContent>
                </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
            <FormField
        control={form.control}
        name="topic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>"what should the companion help with?</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Ex. Learn Javascript" 
                {...field} 
                className="input" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="voice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Voice</FormLabel>
            <FormControl>
                <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}         
                >
                    <SelectTrigger className="input">
                    <SelectValue placeholder="Select the voice" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male"> 
                            Male
                        </SelectItem>
                         <SelectItem value="Female"> 
                            Female
                        </SelectItem>    
                    </SelectContent>
                </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    <FormField
        control={form.control}
        name="style"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Style</FormLabel>
            <FormControl>
                <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}         
                >
                    <SelectTrigger className="input">
                    <SelectValue placeholder="Style the style" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Formal"> 
                            Formal
                        </SelectItem>
                         <SelectItem value="casual"> 
                            Casual
                        </SelectItem>    
                    </SelectContent>
                </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
  control={form.control}
  name="duration"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Estimated duration</FormLabel>
      <FormControl>
        <Input 
          type="number"
          placeholder="15"
          value={field.value}
          onChange={(e) => field.onChange(Number(e.target.value))}
          className="input"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
  
      <Button type="submit" className="w-full cursor-pointer">Create your Course</Button>
    </form>
  </Form>
  )
}

export default CompanionForm