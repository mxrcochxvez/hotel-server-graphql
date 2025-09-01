export async function response<CType extends Function, DType>(callback: CType): Promise<{
	success: boolean,
	data?: DType,
	errorMessage?: string,
}> {
	try {
		const result = await callback();

		return {
			success: true,
			data: result,
		}
	} catch(error) {
		if (error instanceof Error) {
			return {
				success: false,
				errorMessage: error.message,
			}
		}
		 
		return {
			success: false,
			errorMessage: 'Internal Error',
		}
	}
}
