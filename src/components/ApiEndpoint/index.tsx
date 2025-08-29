import { JSX, useState } from "react";
import styles from "./styles.module.css";

const highlightJSON = (jsonString: string) => {
  return jsonString
    .replace(/("[\w\s]*")\s*:/g, '<span class="json-key">$1</span>:')
    .replace(/:\s*(".*?")/g, ': <span class="json-string">$1</span>')
    .replace(/:\s*(\d+)/g, ': <span class="json-number">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
    .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
    .replace(/(\[|\]|\{|\})/g, '<span class="json-bracket">$1</span>');
};

type ApiEndpointProps = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  baseUrls: Array<{
    name?: string;
    url: string;
  }> | string[];
  endpoint: string;
  params?: Array<{
    name: string;
    type?: string;
    optional?: boolean;
    description: string;
    default?: string;
  }>;
  responses?: Record<string, {
    description?: string;
    data: any;
  }>;
}

export default function ApiEndpoint({ 
  method = "GET", 
  baseUrls, 
  endpoint, 
  params = [], 
  responses = {}
}: ApiEndpointProps): JSX.Element {
  const normalizedBaseUrls = baseUrls.map(url => 
    typeof url === 'string' ? { url } : url
  );
  
  const [selectedBaseUrl, setSelectedBaseUrl] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string>(
    Object.keys(responses)[0] || "200"
  );
  const [copied, setCopied] = useState(false);
  const [paramsCollapsed, setParamsCollapsed] = useState(true);
  const [responsesCollapsed, setResponsesCollapsed] = useState(true);
  
  const currentBaseUrl = normalizedBaseUrls[selectedBaseUrl]?.url || '';
  const fullUrl = `${currentBaseUrl}${endpoint}`;
  
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getStatusColor = (status: string) => {
    const code = parseInt(status);
    if (code >= 200 && code < 300) return styles.statusSuccess;
    if (code >= 400 && code < 500) return styles.statusError;
    if (code >= 500) return styles.statusServerError;
    return styles.statusDefault;
  };
  
  return (
    <div className={styles.apiEndpoint}>
      <div className={styles.endpointHeader}>
        <span className={`${styles.method} ${styles[method.toLowerCase()]}`}>
          {method}
        </span>
        <div className={styles.urlContainer}>
          {normalizedBaseUrls.length > 1 && (
            <select
              className={styles.baseUrlSelect}
              value={selectedBaseUrl}
              onChange={(e) => setSelectedBaseUrl(Number(e.target.value))}
            >
              {normalizedBaseUrls.map((base, index) => (
                <option key={index} value={index}>
                  {base.name || `Server ${index + 1}`}
                </option>
              ))}
            </select>
          )}
          <code className={styles.url}>
            <span className={styles.baseUrl}>{currentBaseUrl}</span>
            <span className={styles.path}>{endpoint}</span>
          </code>
          <button 
            className={styles.copyButton}
            onClick={handleCopyUrl}
            title="複製 URL"
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {params.length > 0 && (
        <div className={styles.section}>
          <div className={styles.collapsibleHeader} onClick={() => setParamsCollapsed(!paramsCollapsed)}>
            <div className={styles.titleContainer}>
              <h4 className={styles.sectionTitle}>參數</h4>
              {paramsCollapsed && (
                <div className={styles.previewTags}>
                  {params.slice(0, 3).map((param, index) => (
                    <span key={index} className={`${styles.previewTag} ${param.optional ? styles.optional : styles.required}`}>
                      {param.name}
                    </span>
                  ))}
                  {params.length > 3 && (
                    <span className={styles.moreCount}>+{params.length - 3}</span>
                  )}
                </div>
              )}
            </div>
            <button className={styles.collapseButton}>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="currentColor"
                style={{ transform: paramsCollapsed ? 'rotate(0deg)' : 'rotate(90deg)' }}
              >
                <path d="M6 4l4 4-4 4V4z"/>
              </svg>
            </button>
          </div>
          {!paramsCollapsed && (
            <div className={styles.paramsList}>
              {params.map((param) => (
                <div key={param.name} className={styles.param}>
                  <div className={styles.paramHeader}>
                    <code className={styles.paramName}>{param.name}</code>
                    {param.type && <span className={styles.paramType}>{param.type}</span>}
                    {param.optional && <span className={styles.optional}>optional</span>}
                  </div>
                  <div className={styles.paramDescription}>
                    {param.description}
                    {param.default && <span className={styles.default}> (預設: {param.default})</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {Object.keys(responses).length > 0 && (
        <div className={styles.section}>
          <div className={styles.collapsibleHeader} onClick={() => setResponsesCollapsed(!responsesCollapsed)}>
            <div className={styles.titleContainer}>
              <h4 className={styles.sectionTitle}>回傳</h4>
              {responsesCollapsed && (
                <div className={styles.previewTags}>
                  {Object.keys(responses).slice(0, 4).map((status) => {
                    const code = parseInt(status);
                    let statusType = 'default';
                    if (code >= 200 && code < 300) statusType = 'success';
                    else if (code >= 400 && code < 500) statusType = 'error';
                    else if (code >= 500) statusType = 'serverError';
                    
                    return (
                      <span key={status} className={`${styles.previewTag} ${styles[statusType]}`}>
                        {status}
                      </span>
                    );
                  })}
                  {Object.keys(responses).length > 4 && (
                    <span className={styles.moreCount}>+{Object.keys(responses).length - 4}</span>
                  )}
                </div>
              )}
            </div>
            <button className={styles.collapseButton}>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="currentColor"
                style={{ transform: responsesCollapsed ? 'rotate(0deg)' : 'rotate(90deg)' }}
              >
                <path d="M6 4l4 4-4 4V4z"/>
              </svg>
            </button>
          </div>
          {!responsesCollapsed && (
            <>
              <div className={styles.responseHeader}>
                <select
                  className={`${styles.statusSelect} ${getStatusColor(selectedStatus)}`}
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {Object.keys(responses).map((status) => (
                    <option key={status} value={status}>
                      {status} {responses[status].description && `- ${responses[status].description}`}
                    </option>
                  ))}
                </select>
              </div>
              <pre className={styles.codeBlock}>
                <code 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightJSON(JSON.stringify(responses[selectedStatus]?.data, null, 2))
                  }}
                />
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}