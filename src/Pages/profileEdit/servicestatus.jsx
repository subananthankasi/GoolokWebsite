import { ThreeDots } from 'react-loader-spinner';
import ServiceStatusGetPatta from './ServiceStatusGetPatta';
import ServiceStatusGmap from './ServiceStatusGmap';
import { Skeleton } from 'primereact/skeleton';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ServiceStatusLandSurvey from './ServiceStatusLandSurvey';
import ServiceStatusLegaling from './ServiceStatusLegaling';
import ServiceStatusPropertyValuation from './ServiceStatusPropertyValuation';
import ServiceStatusMissingDocuments from './ServiceStatusMissingDocuments';

const ServiceStatus = ({ invoiceData, fetchInvoice, eid, loading }) => {
  if (loading) {

    return (
      <div className="pt-3 ps-3 pe-3 mt-4">
        <Skeleton height="4rem" className="mb-2 mt-3" />
        <Skeleton height="4rem" className="mb-2" />
        <Skeleton height="4rem" className="mb-2" />
        <Skeleton height="4rem" className="mb-2" />
        <Skeleton height="4rem" className="mb-2" />
        <Skeleton height="4rem" className="mb-2" />
      </div>

    );
  }

  const serviceCat = invoiceData?.[0]?.service_cat;

  return (
    <div>
      {serviceCat === "get patta for your property" ? (
        <div>
          <h6 className='text-center' style={{ fontWeight: "600" }}>Get Patta For Your Property</h6>
          <hr />
          <ServiceStatusGetPatta
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) : serviceCat === "find your property google map location" ? (
        <div>
          <h6 className='text-center' style={{ fontWeight: "600" }}>Find Your Property Google Map Location</h6>
          <hr />
          <ServiceStatusGmap
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) : serviceCat === "Land Survey" ? (
        <div>
          <h6 className='text-center' style={{ fontWeight: "600" }}>Land Survey</h6>
          <hr />
          <ServiceStatusLandSurvey
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) : serviceCat === "legal opinion" ? (
        <div>
          <h6 className='text-center' style={{ fontWeight: "600" }}>Legal Opinion</h6>
          <hr />
          <ServiceStatusLegaling
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) : serviceCat === "Property Valuation" ? (
        <div>
          <h6 className='text-center' style={{ fontWeight: "600" }}>Property Valuation</h6>
          <hr />
          <ServiceStatusPropertyValuation
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) :  serviceCat === "Missing Documents" ? (
        <div>
          <h6 className='text-center' style={{ fontWeight: "600" }}>Missing Documents</h6>
          <hr />
          <ServiceStatusMissingDocuments
            invoiceData={invoiceData}
            eid={eid}
            fetchInvoice={fetchInvoice}
          />
        </div>
      ) :(

        <div className="text-center mt-5 pt-5">
          <h4 className="text-center"><SearchOffIcon sx={{ fontSize: 25 }} /> No data</h4>
        </div>
      )}
    </div>
  );
};

export default ServiceStatus;
