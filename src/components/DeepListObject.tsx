import React, { isValidElement } from 'react';
import { Grid, SxProps, Theme } from '@mui/material';
import { isArray, isObject } from '../utils';

type Props = {
	obj?: any;
	sx?: SxProps<Theme>;
	hideKeys?: boolean;
};

export const DeepListObject = ({ obj, sx, hideKeys = isArray(obj) }: Props) => {
	if (typeof obj !== 'object') return obj;

	return (
		<Grid
			container
			className={'deep-list-object--grid-container'}
			sx={{
				display: 'grid',
				gridTemplateColumns: (hideKeys ? '' : 'fit-content(100%) ') + 'auto',
				gridGap: '0.25rem 1rem',
				...sx,
			}}
		>
			{obj &&
				Object.entries(obj).map(([label, element], i) => (
					<React.Fragment key={`deep-list-object--key-value-pair-${i}`}>
						{!hideKeys && (
							<Grid
								item
								className={`deep-list-object-key`}
								sx={{
									fontWeight: 300,
									overflowWrap: 'normal',
									display: 'flex',
								}}
							>
								{label
									.match(
										/[A-Z]?[a-z]+|[A-Z]+(?=[A-Z][a-z]+|[^A-Za-z]|$)|[^A-Za-z\s_-]+/g, // parse object key into words|acronyms|other groupings
									)
									?.join(' ')
									.replaceAll(/(?:^|\s)([a-z])/g, (match) => {
										return match.toUpperCase();
									})}
							</Grid>
						)}
						<Grid
							item
							className={`deep-list-object-value`}
							sx={{
								fontWeight: 800,
								overflowWrap: 'anywhere',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
							}}
						>
							{isValidElement(element) ? (
								element
							) : isObject(element) || isArray(element) ? (
								<>
									<span style={{ fontWeight: 300 }}>
										{isArray(element) ? `[` : `{`}
									</span>
									<DeepListObject
										obj={element}
										sx={{ paddingLeft: '1.5rem' }}
									/>
									<span style={{ fontWeight: 300 }}>
										{isArray(element) ? `]` : `}`}
									</span>
								</>
							) : (
								element?.toString() ?? ''
							)}
						</Grid>
					</React.Fragment>
				))}
		</Grid>
	);
};
