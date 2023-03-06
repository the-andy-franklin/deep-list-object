import React, { isValidElement } from 'react';
import { Grid, SxProps, Theme } from '@mui/material';
import { isArray, isObject } from '../utils';

type Props = {
	obj?: Object;
	sx?: SxProps<Theme>;
	keySx?: SxProps<Theme>;
	hideKeys?: boolean;
};

export const DeepListObject = ({
	obj,
	sx,
	keySx,
	hideKeys = isArray(obj),
}: Props) => {
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
					<React.Fragment key={`deep-list-object--key-pair-value-${i}`}>
						{!hideKeys && (
							<Grid
								item
								className={`deep-list-object-key`}
								sx={{
									fontWeight: 300,
									overflowWrap: 'normal',
									display: 'flex',
									alignItems:
										!isValidElement(element) ||
										typeof element.type === 'string' ||
										element.type.name === (<DeepListObject />).type.name
											? 'flex-start'
											: 'center',
									...keySx,
								}}
							>
								{
									label.match(/^[A-Z][A-Za-z]*$|\s/) // if it matches this, then it is not camelCase. return value as-is
										? label
										: label
												.match(
													/[A-Z]?[a-z]+|[A-Z]+(?!=[A-Z]|[a-z])|[^A-Za-z]+/g, // parse object key into word/acronym groupings
												)
												?.join(' ')
												.replace(/^[a-z]/, (match) => match.toUpperCase()) // capitalize first letter
								}
							</Grid>
						)}
						<Grid
							item
							className={`deep-list-object-value`}
							sx={{
								fontWeight: 800,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								overflowWrap: 'anywhere',
							}}
						>
							{isValidElement(element) ? (
								element
							) : isObject(element) || isArray(element) ? (
								<>
									<span>{`{`}</span>
									<DeepListObject
										obj={element}
										sx={{ paddingLeft: '1.5rem' }}
									/>
									<span>{`}`}</span>
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
