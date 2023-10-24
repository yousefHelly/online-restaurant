import { useMutation, useQueryClient } from "react-query";
import { axiosAuth } from "./axios";
import toast from "react-hot-toast";
type Props = {}

export function PostComment(name: string | undefined) {
    const clientQuery = useQueryClient()
  return useMutation({
    mutationFn:({review, id, rating}:{review: string, id: number, rating: number})=>( axiosAuth.post('/api/mealReview',{text: review, mealId: id, rate: rating})),
    onSuccess(res, variables, context) {
        toast.success((res as any).data.message)
        clientQuery.invalidateQueries(['dish', name])
    },
    onError(err, variables, context) {
        toast.error((err as any).response.data as string,{id:'AlreadyHaveAReview'})
    },
})
}