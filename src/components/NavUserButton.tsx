
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Button } from './ui/Button';

interface NavUserButtonProps {
	user: any // TODO: fix for a good User type
	// children: React.ReactNode
}

export default function NavUserButton ({
	user,
	// children
}: NavUserButtonProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button>{user.email}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<a href="/api/logout">Sign out</a>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}