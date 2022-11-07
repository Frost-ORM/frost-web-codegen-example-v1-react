import { ClubFullModel } from "@frost-orm/frost-web-client";
import { Box, Stack, Typography } from "@mui/material";
import { ComponentProps } from "react";
import { ClubCard } from "./club-card";

export type ClubsListProps = {
	data: Record<string, ClubFullModel>;
	extraProps?: ComponentProps<typeof Box>;
};

export function ClubsList({ data, extraProps }: ClubsListProps) {
	return (
		<Box id="clubs-container" {...(extraProps ?? {})}>
			<Typography variant="h5">Clubs List</Typography>

			<Stack id="clubs-list" direction={"column"} gap={5}>
				{Object.values(data ?? {}).map((club) => (
					<ClubCard key={club.id} club={club} />
				))}
			</Stack>
		</Box>
	);
}
