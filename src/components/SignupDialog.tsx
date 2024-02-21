
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog";
import { Button } from './ui/Button';

interface SignupDialogProps {
	children: React.ReactNode
}

export default function SignupDialog ({
	children
}: SignupDialogProps) {
	return (
		<Dialog>
			<DialogTrigger>
				<Button>Sign up to rate your property</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Sign up</DialogTitle>
					{/* Description for screen readers, esp if combined with visually hidden from Radix */}
					{/* <DialogDescription>
						This action cannot be undone. This will permanently delete your account
						and remove your data from our servers.
					</DialogDescription> */}
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}