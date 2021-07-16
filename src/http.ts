/**
 * @author WMXPY
 * @namespace Socket
 * @description Http
 */

export const buildHttpSwitchingProtocolsHeader = (
    acceptKey: string,
): string => {

    const headerList: string[] = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${acceptKey}`,
        'Sec-WebSocket-Origin: *',
    ];
    return headerList.join('\n');
};
