
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog";
import { Button } from './ui/Button';

interface LoginDialogProps {
	children: React.ReactNode
}

export default function LoginDialog ({
	children
}: LoginDialogProps) {
	return (
		<Dialog>
			<DialogTrigger>
				<Button>Log in</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Log in</DialogTitle>
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