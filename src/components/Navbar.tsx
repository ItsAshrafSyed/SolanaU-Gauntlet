import {
	Box,
	Flex,
	Heading,
	Spacer,
	Image,
	ButtonGroup,
	HStack,
	Button,
	Icon,
	IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import "@fontsource-variable/readex-pro";
import { WalletConnect } from "./Modals/wallet/WalletConnect";
import "@fontsource/bangers";
import { useState } from "react";

export const Navbar = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState("none");

	const handleHomeClick = () => {
		router.push("/");
		setIsOpen("none");
	};
	const handleLeaderboardClick = () => {
		router.push("/leaderboard");
		setIsOpen("none");
	};
	const handleChallengesClick = () => {
		router.push("/challenges");
		setIsOpen("none");
	};
	return (
		<>
			<Flex
				w="100vw"
				bg={"#0E0E10"}
				blur={"blur(10px)"}
				borderBottom={"1.5px solid #1E1E23"}
				align={"center"}
				justify={"space-between"}
			>
				<Box p="2" onClick={() => router.push("/")}>
					<HStack>
						<IconButton
							aria-label="logo"
							icon={<Image src="/icons/logo.svg" alt="logo" width={"5vh"} />}
							variant="ghost"
							colorScheme="transparent"
						/>
						<Heading
							size="md"
							fontWeight={500}
							fontSize={24}
							fontFamily={"Bangers"}
						>
							The Gauntlet
						</Heading>
					</HStack>
				</Box>
				<Box display={["none", "none", "flex", "flex"]}>
					<ButtonGroup spacing={"0.5"}>
						<Button
							colorScheme="white"
							variant="ghost"
							fontWeight={500}
							fontSize={20}
							onClick={() => router.push("/")}
						>
							Home
						</Button>
						<Button
							colorScheme="white"
							variant="ghost"
							fontWeight={500}
							fontSize={20}
							onClick={() => router.push("/leaderboard")}
						>
							Leaderboard
						</Button>
						<Button
							colorScheme="white"
							variant="ghost"
							fontWeight={500}
							fontSize={20}
							onClick={() => router.push("/challenges")}
						>
							View Challenges
						</Button>
					</ButtonGroup>

					<WalletConnect />
				</Box>
				<IconButton
					aria-label="Open Menu"
					size={"lg"}
					colorScheme="#111"
					color={"white"}
					icon={<HamburgerIcon />}
					display={["flex", "flex", "none", "none"]}
					onClick={() => setIsOpen("flex")}
				/>
			</Flex>
			<Flex
				w="100vw"
				bg={"rgba(29, 29, 29, 0.5)"}
				backdropBlur={10}
				h={"100vh"}
				zIndex={20}
				overflow={"auto"}
				flexDir={"column"}
				top={"0"}
				left={"0"}
				display={isOpen}
			>
				<Flex justify={"flex-end"}>
					<IconButton
						aria-label="Close Menu"
						size={"lg"}
						bg={"#111"}
						color={"white"}
						icon={<CloseIcon />}
						onClick={() => setIsOpen("none")}
					/>
				</Flex>
				<Flex flexDir="column" align={"center"} justify={"space-evenly"}>
					<Button
						colorScheme="white"
						variant="ghost"
						fontWeight={500}
						fontSize={20}
						onClick={handleHomeClick}
					>
						Home
					</Button>
					<Button
						colorScheme="white"
						variant="ghost"
						fontWeight={500}
						fontSize={20}
						onClick={handleLeaderboardClick}
					>
						Leaderboard
					</Button>
					<Button
						colorScheme="white"
						variant="ghost"
						fontWeight={500}
						fontSize={20}
						onClick={handleChallengesClick}
					>
						View Challenges
					</Button>
					<Box display={{ base: "none", md: "flex" }}>
						<WalletConnect />
					</Box>
				</Flex>
			</Flex>
		</>
	);
};
